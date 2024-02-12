import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const vote = id => {
        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(id))
        dispatch(changeNotification(`Voted "${anecdote.content}"`))
        setTimeout(() => { dispatch(changeNotification(null)) }, 5000)
    }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
            }
        </div>
    )
}


export default AnecdoteList