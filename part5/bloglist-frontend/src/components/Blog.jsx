import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleLikeChange, handleRemove, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    < div style={blogStyle} >
      {blog.author}: {blog.title}
      <div>
        <button id="show-button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {showDetails && <div>
        <div className="blog-url">
          {blog.url}
        </div>
        <div className="blog-likes">
          Likes: {blog.likes}
          <button id="like-button" onClick={handleLikeChange}>like</button>
        </div>
        <div>Blog added by: {blog.user.username}</div>
        {loggedUser.username === blog.user.username &&
          <button onClick={handleRemove}>remove</button>}
      </div>}
    </div >
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog