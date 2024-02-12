import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addNewAnecdote(content))
        dispatch(changeNotification(`Added anecdote "${content}"`))
        setTimeout(() => { dispatch(changeNotification(null)) }, 5000)


    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm