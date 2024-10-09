import { useState } from 'react'

const StatisticLine  = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {(props.text=='positive')? '%':''}</td>
    </tr>

  )
}

const Statistic = (props) => {

  const sum = () => {
    return props.good + props.neutral  +props.bad
  }

  const average = () => {
    if(sum() !=0){
      return (props.good + props.neutral*0 + props.bad*(-1)) / (sum())
    }else {
      return 0;
    }
  }
  const positiveStatistic = () => {
    if(sum() !=0){
      return props.good*100 / (sum())
    }else {
      return 0;
    }
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={sum()}/>
        <StatisticLine text='average' value={average()}/>
        <StatisticLine text='positive' value={positiveStatistic()}/>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.value}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [displayStatistics, setDisplayStatistics] = useState(false)

  return (
    <>
      <h1>give feedback</h1>
      <>
        <Button onClick={()=>{setGood(good + 1); setDisplayStatistics(true)}} value='good'/>
        <Button onClick={()=>{setNeutral(neutral + 1); setDisplayStatistics(true)}} value='neutral' />
        <Button onClick={()=>{setBad(bad + 1); setDisplayStatistics(true)}} value='bad'/>
      </>
      <h1>statistics</h1>
      {displayStatistics? 
        <Statistic good={good} neutral={neutral} bad={bad}/>
      :
        <p>No feedback given</p>
      }
    </>
  )
}

export default App