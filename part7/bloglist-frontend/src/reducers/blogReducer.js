import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    setBlog(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.newBlog(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(`Added ${blog.title} by ${blog.author}`, "success"),
      );
    } catch (exception) {
      dispatch(
        setNotification(
          "Error adding new blog. Blog must have title, author and url.",
          "warning",
        ),
      );
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    try {
      const blogToLike = blogs.find((blog) => blog.id === id);

      const likedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      };

      await blogService.update(id, likedBlog);
      dispatch(setBlogs(blogs.map((b) => (b.id !== id ? b : likedBlog))));
    } catch (exception) {
      dispatch(
        setNotification("Blog was already removed from server", "warning"),
      );
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogToDelete = blogs.find((blog) => blog.id === id);
    await blogService.remove(id);
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)));
    dispatch(setNotification(`Deleted ${blogToDelete.title}`, "success"));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const blogToComment = blogs.find((blog) => blog.id === id);
    await blogService.comment(id, { comment });
    blogToComment.comments.push(comment);
    dispatch(setBlogs(blogs.map((b) => (b.id !== id ? b : blogToComment))));
  };
};
export const { appendBlog, setBlogs, setBlog } = blogSlice.actions;
export default blogSlice.reducer;
