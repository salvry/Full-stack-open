import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  return(
  <div>
      <h2>Statistics</h2>
      {props.all > 0 ? 
      <table>
        <tbody>
        <StatisticLine text={"Good"} value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={`${props.positive}%`}/>
      </tbody>
      </table>
    :
    <p>No feedback</p>}
    </div>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>{props.text}</button>
  )
}
function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const avg = (good + bad * -1)/all
  const positive = good/all*100 
  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <Button handleClick={()=>setGood(good+1)}text="Good"/>
      <Button handleClick={()=>setNeutral(neutral+1)}text="Neutral"/>
      <Button handleClick={()=>setBad(bad+1)}text="Bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={avg} positive={positive} />
    </div>
  )
}

export default App
