import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const response = await axios.post(baseUrl, { content: content, votes: 0 })
    return response.data
}

const voteAnecdote = async (id, votedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return response.data
}

const getAnecdoteById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, createAnecdote, voteAnecdote, getAnecdoteById }