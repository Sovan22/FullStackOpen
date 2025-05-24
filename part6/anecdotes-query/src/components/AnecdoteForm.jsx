import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotify } from './NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      // const anecdotes = queryClient.getQueriesData(['anecdotes']).concat(newAnecdote)
      // queryClient.setQueriesData(['anecdotes'], anecdotes)
    },
    onError: (error) => {
      // console.error(error)
      notify(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notify(`you created '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
