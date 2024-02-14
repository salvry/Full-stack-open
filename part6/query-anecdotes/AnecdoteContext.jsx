/* eslint-disable react/prop-types */

import { createContext, useReducer } from 'react'

const anecdoteReducer = (state, action) => {
    switch (action.type) {
        case "NEW_ANECDOTE":
            return action.payload
        case "VOTE_ANECDOTE":
            return action.payload
        default:
            return state
    }
}

const AnecdoteContext = createContext()
export const AnecdoteContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(anecdoteReducer, '')

    return (
        <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export default AnecdoteContext