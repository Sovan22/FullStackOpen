import {useDispatch, useSelector} from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotesRes = useSelector(({anecdotes, filter}) =>{
        if (filter.length === 0) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const anecdotes = [...anecdotesRes].sort((a, b) => b.votes - a.votes)
        
    const vote = async (anecdote) => {

        // console.log('vote', id)
        // const updateAnecdote = await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
        dispatch(updateAnecdote({...anecdote, votes: anecdote.votes + 1}))
        dispatch(setNotification(`you voted for : ${anecdote.content}`,5))

    }

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes} votes</div>
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList