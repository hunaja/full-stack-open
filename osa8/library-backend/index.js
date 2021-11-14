const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

dotenv.config()

const MONGO_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGO_URI)
  .then(async () => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err))

const typeDefs = gql`
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }
`

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => await Book.estimatedDocumentCount(),
    authorCount: async () => await Author.estimatedDocumentCount(),
    allBooks: async (root, args) => {
      let query = {}

      if (args.genre) query = { genres: args.genre }

      return await Book.find(query).populate('author')
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('unauthenticated')
      }

      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres
        })

        let author = await Author.findOne({ name: args.author })
        if (!author) author = new Author({ name: args.author })

        author.bookCount += 1
        const savedAuthor = await author.save()

        book.author = savedAuthor._id
        const savedBook = await book.save()

        const bookAdded = { ...savedBook._doc, author: savedAuthor }

        pubsub.publish('BOOK_ADDED', { bookAdded })

        return bookAdded
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('unauthenticated')
      }

      try {
        const author = await Author.findOneAndUpdate({
          name: args.name
        }, { 
          born: args.setBornTo 
        }, {
          returnDocument: 'after'
        })
        
        return author 
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })

        const savedUser = await user.save()

        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username
      })

      if (!user || args.password !== 'sala') {
        throw new UserInputError('invalid username or password')
      }

      const tokenUser = {
        username: args.username,
        id: user._id
      }

      return { value: jwt.sign(tokenUser, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
  typeDefs,
  resolvers,
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
