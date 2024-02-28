import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Blog = ({ blog, loggedUser }) => {
  const [commentValue, setCommentValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);

  const like = (id) => {
    dispatch(likeBlog(id));
  };

  const comment = (id) => {
    setCommentValue("");
    dispatch(commentBlog(id, commentValue));
  };

  const removeBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(deleteBlog(id));
      navigate("/blogs");
    }
  };
  if (blog && loggedUser) {
    return (
      <div className="blog">
        <h2>
          {blog.author}: {blog.title}
        </h2>
        <div>
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            Likes: {blog.likes}
            <Button className="like-button" onClick={() => like(blog.id)}>
              Like
            </Button>
          </div>
          <div>Blog added by: {blog.user.username}</div>
          <div>
            {loggedUser.username === blog.user.username && (
              <Button variant="warning" onClick={() => removeBlog(blog.id)}>
                Remove
              </Button>
            )}
          </div>
          <div>
            <h3>Comments</h3>
            <input
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
            />
            <Button onClick={() => comment(blog.id)}>Add comment</Button>
          </div>
          {blog.comments.length > 0 && (
            <div>
              <ul>
                {blog.comments.map((comment) => (
                  <li key={blog.comments.indexOf(comment)}>{comment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Blog;
