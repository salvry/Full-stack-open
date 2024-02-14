import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteContext from '../AnecdoteContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, postAnecdote, voteAnecdote } from './requests'
import { useContext } from 'react'



const App = () => {
  const [notification, dispatch] = useContext(AnecdoteContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "NEW_ANECDOTE", payload: `Added new anecdote "${content}"` })
    setTimeout(() => dispatch({ type: "NEW_ANECDOTE", payload: "" }), 5000)

  }
  const handleVote = (anecdote) => {
    console.log('vote')
    console.log(anecdote)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log(updatedAnecdote)
    updateAnecdoteMutation.mutate(updatedAnecdote)
    dispatch({ type: "VOTE_ANECDOTE", payload: `Voted anecdote "${updatedAnecdote.content}"` })
    setTimeout(() => dispatch({ type: "VOTE_ANECDOTE", payload: "" }), 5000)

  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={onCreate} />

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
