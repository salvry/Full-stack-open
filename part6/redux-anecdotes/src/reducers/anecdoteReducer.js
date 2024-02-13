import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getAnecdoteById(id)
    const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
    await anecdoteService.voteAnecdote(id, votedAnecdote)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.map(a => a.id !== id ? a : votedAnecdote)))
  }
}




export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer