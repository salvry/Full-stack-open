import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, getLoggedUser } from "./reducers/loggedUserReducer";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route, useMatch, Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");

  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const user = matchUser
    ? users.find((blog) => blog.id === matchUser.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(logIn(username, password));
    setUsername("");
    setPassword("");
    navigate("/");
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <div>
        <Notification />
        <div>
          {!loggedUser && (
            <>
              <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
                <Navbar.Brand href="/">Blog app</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                      <Link to="/login">Log in</Link>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </>
          )}
        </div>
      </div>
      <div>
        {loggedUser && (
          <>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
              <Navbar.Brand href="/">Blog app</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#" as="span">
                    <Link to="/blogs">Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href="#" as="span">
                    <Link to="/users">Users</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <p>Logged in: {loggedUser.username}</p>
                  </Nav.Link>
                  <Nav.Link>
                    <Button id="logout-button" onClick={handleLogout}>
                      Log out
                    </Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
        )}
      </div>
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            }
          />
          <Route path="/blogs" element={<BlogList blogs={sortedBlogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                handleLikeChange={() => like(blog.id)}
                handleRemove={() => removeBlog(blog.id)}
                loggedUser={loggedUser}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
