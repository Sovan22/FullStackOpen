import { log } from 'node-red';
import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const MostVoted = ({points , anecdotes}) =>{
   const maxPoints = Math.max(...points)
   const mostVoted = points.indexOf(maxPoints)
   
   if(maxPoints != 0){
    return (
      <>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {maxPoints} votes</p>
      </>
    )
   }
    return(
      <p>No votes</p>
    )
   
}

function App() {
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
  const point = [];
  for (let i = 0; i < anecdotes.length; i++) {
    point.push(0);
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(point)

  const nextAnecdote = () => {
    const rand =  getRandomInt(anecdotes.length)
    // while(rand == selected){rand = getRandomInt(anecdotes.length)}
    setSelected(rand)
  }
  const updateVote = () =>{
    const updatePoints = [...points]
    updatePoints[selected] += 1
    setPoints(updatePoints)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      <p>has {points[selected]} votes</p>
      <button onClick={updateVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
