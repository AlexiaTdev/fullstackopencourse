import { useState } from 'react'

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
    <>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {average()}</p>
      <p>positive {positiveStatistic()}%</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <>
      <h1>give feedback</h1>
      <>
        <button onClick={()=>setGood(good + 1)}>good</button>
        <button onClick={()=>setNeutral(neutral + 1)}>neutral</button>
        <button onClick={()=>setBad(bad + 1)}>bad</button>
      </>
      <Statistic good={good} neutral={neutral} bad={bad}/>
      
    </>
  )
}

export default App