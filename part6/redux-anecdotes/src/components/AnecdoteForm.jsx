import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        if(content === ''){
            dispatch(setNotification('Empty anecdote: Type something'))
            return
        }
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You create a new anecdote : ${content}`, 5))
    };
    
    return (
        <form onSubmit={handleSubmit}>
        <div>
            <input name="anecdote" />
        </div>
        <button type="submit">create</button>
        </form>
    );   
}

export default AnecdoteForm