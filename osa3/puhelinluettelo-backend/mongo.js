/** Solution to 3.12 */

const mongoose = require('mongoose')
const Person = require('./models/person.js')

const [,,password, name, number] = process.argv

const mongoUrl = `MONGO_URL=mongodb+srv://root:${password}@cluster0.eblp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongoUrl).then(() => {
  if (!name || !number) {
    console.log('phonebook:')
  
    Person.find({})
      .then((pa) => pa.forEach((p) => console.log(`${p.name} ${p.number}`)))
      .then(() => mongoose.connection.close())
  
    return
  }
  
  const person = new Person({ name, number })
  
  person.save()
    .then((p) => console.log(`Added ${p.name} number ${number} to phonebook`))
    .then(() => mongoose.connection.close())
})

