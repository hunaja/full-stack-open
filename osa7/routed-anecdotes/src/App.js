import React, { useRef, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={'/anecdotes/' + anecdote.id}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const history = useHistory()

  const handleReset = (e) => {
    e.preventDefault()
    
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.value,
      value: author.value,
      info: info.value,
      votes: 0
    })
    
    history.push('/')
    props.setNotification(`a new anecdote ${content.value} created!`)
    setTimeout(() => props.setNotification(null), 10*1000)
  }

  const { reset: _c, ...contentParams } = content
  const { reset: _a, ...authorParams } = author
  const { reset: _i, ...infoParams } = info

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...contentParams } />
        </div>
        <div>
          author
          <input { ...authorParams } />
        </div>
        <div>
          url for more info
          <input { ...infoParams } />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((a) => a.id === id)

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <b>{notification}</b>}

        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>

          <Route path="/create">
            <CreateNew addNew={addNew} setNotification={setNotification} />
          </Route>
          
          <Route path="/about">
            <About />
          </Route>

          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  )
}

export default App;