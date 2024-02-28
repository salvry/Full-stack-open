import BlogListRow from "../components/BlogListRow";
import BlogForm from "../components/BlogForm";
import Togglable from "../components/Togglable";
import { useRef } from "react";
import { addNewBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch();

  const addBlog = (blog) => {
    dispatch(addNewBlog(blog));
    blogFormRef.current.toggleVisibility();
  };
  const blogFormRef = useRef();
  return (
    <>
      <div>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <ListGroup>
        {blogs.map((blog) => (
          <BlogListRow key={blog.id} blog={blog} />
        ))}
      </ListGroup>
    </>
  );
};
export default BlogList;
