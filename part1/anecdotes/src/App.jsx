import { useState } from 'react'

const Presentation = ({...props}) => {
  return (
    <>
        <h1>{props.title}</h1>
      <div>
        {props.anecdote}
      </div>
      <p>has {props.vote} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selectedMaxVotes, setSelectedMaxVotes] = useState(0)

  const getNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const voteAnecdote = () => {
    const copyVotes = {... votes};
    copyVotes[selected]+=1;
    setVotes(copyVotes)
    if(copyVotes[selected]>votes[selectedMaxVotes]){
      setSelectedMaxVotes(selected)
    }
  }

  return (
    <>
      <Presentation title='Anecdote of the day' anecdote={anecdotes[selected]} vote={votes[selected]}/>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={getNextAnecdote}>next anecdote</button>
      <Presentation title='Anecdote with most votes' anecdote={anecdotes[selectedMaxVotes]} vote={votes[selectedMaxVotes]}/>
    </>
  )
}

export default App