import React, { useState } from 'react'

/** An utility function to select a random index from an array. */
const randomIndex = (arr) => Math.floor(Math.random()*arr.length)

/** An utility function to get the index of the max element in an array. */
const inxedOfMax = (arr) => arr.indexOf(Math.max(...arr))

const Anecdote = ({ anecdotes, index, points}) => (
  <>
    {anecdotes[index]}
    <br />
    votes {points[index]}
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const voteSelected = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  
  const setRandomSelected = () => setSelected(randomIndex(anecdotes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote 
        anecdotes={anecdotes} 
        points={points}
        index={selected} />
      <br />
      
      <button onClick={() => voteSelected()}>
        vote
      </button>
      <button onClick={() => setRandomSelected()}>
        next anecdote
      </button>

      <h1>Anecdote with the most votes</h1>
      <Anecdote
        anecdotes={anecdotes} 
        points={points} 
        index={inxedOfMax(points)} />
    </div>
  )
}

export default App