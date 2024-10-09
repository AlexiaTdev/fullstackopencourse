import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = () => {
    if(good+neutral+bad !=0){
      return (good + neutral*0 + bad*(-1))/(good+neutral+bad)
    }else {
      return 0;
    }
  }
  const positiveStatistic = () => {
    if(good+neutral+bad !=0){
      return good*100/(good+neutral+bad)
    }else {
      return 0;
    }
  }

  return (
    <>
      <h1>give feedback</h1>
      <>
        <button onClick={()=>setGood(good + 1)}>good</button>
        <button onClick={()=>setNeutral(neutral + 1)}>neutral</button>
        <button onClick={()=>setBad(bad + 1)}>bad</button>
      </>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {average()}</p>
      <p>positive {positiveStatistic()}%</p>
    </>
  )
}

export default App