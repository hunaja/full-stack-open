import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const StatisticLine = ({ text, value, percent }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {percent && '%'}</td>
  </tr>
)

const Statistics = () => {
  const { good, ok, bad } = store.getState()

  if (!good && !ok && !bad) return <>No feedback given</>

  const all = good + ok + bad
  const average = Math.max((good - bad) / all,0)
  const positive = (good / all) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={ok} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} percent />
      </tbody>
    </table>
  )
}

const App = () => {
  const good = () => store.dispatch({ type: 'GOOD' })
  const neutral = () => store.dispatch({ type: 'OK' })
  const bad = () => store.dispatch({ type: 'BAD' })
  const zero = () => store.dispatch({ type: 'ZERO' })

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>

      <h1>statistics</h1>
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)