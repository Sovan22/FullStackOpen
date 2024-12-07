import { useState } from 'react'
const Button = ({handleClick, text}) =>{
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text,value}) =>{
  return (
    <tbody>
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
    </tbody>
  )
}

const Statistics = (props) =>{
  const {good, neutral,bad} = props
  const all = good + neutral + bad
  const avg = (good*1 + bad*-1)/all
  const positive = (good * 100)/all + " %"

  if(good != 0 || bad != 0 || neutral!=0){
    return(
      <table>
      <StatisticLine text="good" value = {good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="all" value ={all} />
      <StatisticLine text="average" value ={avg} />
      <StatisticLine text="positive" value ={positive} />
      </table>
    )
  }
  return(
    <p>No feedback given</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick= {() => setGood(good + 1)} text = "good"/>
      <Button handleClick= {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick= {() => setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral={neutral} bad ={bad}/>
      {/* <Display text = "good" count = {good}/>
      <Display text = "neutral" count = {neutral}/>
      <Display text = "bad" count = {bad}/>
      <Display text = "all" count = {all}/>
      <Display text = "average" count = {(good * 1 + bad * -1)/all}/>
      <Display text = "positive" count = {(good * 100)/all}/> */}
    </div>
  )
}

export default App
