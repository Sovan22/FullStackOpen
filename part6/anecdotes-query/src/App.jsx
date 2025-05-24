import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests.js'
import { useNotify } from './components/NotificationContext.jsx'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['anecdotes']
      // })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    const notificationMessage = `you voted '${anecdote.content}'`
    notify(notificationMessage)
    console.log('vote')
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
  
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  if(result.isError) {
    return <div>Anecdote service is not available due to server problems</div>
  }
  const anecdotes = result.data
  // [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
