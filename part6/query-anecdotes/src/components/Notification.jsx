/* eslint-disable react/prop-types */
import AnecdoteContext from '/AnecdoteContext'
import { useContext } from 'react'

const Notification = () => {

  const [notification, dispatch] = useContext(AnecdoteContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }



  return (
    notification ?
      <div style={style}>
        {notification}
      </div>
      :
      null

  )
}




export default Notification
