import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        changeNotification(state, action) {
            return action.payload
        }
    }
})
export const setNotification = (text, time) => {
    return dispatch => {
        dispatch(changeNotification(text))
        setTimeout(() => { dispatch(changeNotification(null)) }, time * 1000)
    }

}


export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer