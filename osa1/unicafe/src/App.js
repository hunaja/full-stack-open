import React, { useState } from 'react'

const StatisticLine = ({ text, value, percent }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {percent && '%'}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad}) => {
  if (!good && !neutral && !bad) return <>No feedback given</>

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} percent />
      </tbody>
    </table>
  )
}

const Button = ({ text, value, setter}) => (
  <button onClick={() => setter(value + 1)}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" value={good} setter={setGood} />
      <Button text="neutral" value={neutral} setter={setNeutral} />
      <Button text="bad" value={bad} setter={setBad} />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App