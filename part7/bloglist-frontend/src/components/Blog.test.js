import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const emptyFunc = () => {};

const blog = {
  title: "Example blog",
  author: "Anonymous",
  url: "exampleblog.com",
  likes: 0,
  user: { username: "example user" },
};
test("renders blog", () => {
  render(
    <Blog
      blog={blog}
      handleLikeChange={emptyFunc}
      handleRemove={emptyFunc}
      loggedUser={{}}
    />,
  );

  const element = screen.getByText("Anonymous: Example blog");

  expect(element).toBeDefined();
});

test("shows blog details on button click", async () => {
  const { container } = render(
    <Blog
      blog={blog}
      handleLikeChange={emptyFunc}
      handleRemove={emptyFunc}
      loggedUser={{}}
    />,
  );
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const url = screen.getByText("exampleblog.com");
  const likes = screen.getByText("Likes: 0");
  const hideButton = container.querySelector("#show-button");
  const likeButton = container.querySelector("#like-button");
  const blogAdder = screen.getByText("Blog added by: example user");
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
  expect(hideButton).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(blogAdder).toBeDefined();
});

test("event handler is called twice when button is clicked twice", async () => {
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog
      blog={blog}
      handleLikeChange={mockHandler}
      handleRemove={emptyFunc}
      loggedUser={{}}
    />,
  );
  const user = userEvent.setup();
  const viewButton = container.querySelector("#show-button");
  await user.click(viewButton);
  const likeButton = container.querySelector("#like-button");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("blog form submit", async () => {
  const createBlog = jest.fn();
  const { container } = render(<BlogForm createBlog={createBlog} />);
  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  await userEvent.type(title, "Blog title");
  await userEvent.type(author, "Author");
  await userEvent.type(url, "Blog url");
  const submitButton = screen.getByText("Add");
  await userEvent.click(submitButton);
  screen.debug();
  expect(createBlog.mock.calls[0][0].title).toBe("Blog title");
  expect(createBlog.mock.calls[0][0].author).toBe("Author");
  expect(createBlog.mock.calls[0][0].url).toBe("Blog url");
});
