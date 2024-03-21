import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from "./queries.js";

const App = () => {
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(data);
      console.log(addedBook);
      alert(`New book: ${addedBook.title} by ${addedBook.author.name}`);
      client.cache.updateQuery({ query: ALL_BOOKS }, (allBooks) => {
        return {
          allBooks: allBooks.allBooks.concat(addedBook),
        };
      });

      client.cache.updateQuery({ query: ALL_AUTHORS }, (allAuthors) => {
        console.log(allAuthors);
        const author = allAuthors.allAuthors.find(
          (a) => a.name === addedBook.author.name
        );
        console.log(author);
        const updatedAuthor = { ...author, bookCount: author.bookCount + 1 };
        return {
          allAuthors: allAuthors.allAuthors.map((a) =>
            a.name !== addedBook.author.name ? a : updatedAuthor
          ),
        };
      });
    },
  });

  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };

  if (!token) {
    return (
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/books")}>books</button>
        <button onClick={() => navigate("/login")}>login</button>

        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => navigate("/authors")}>authors</button>
        <button onClick={() => navigate("/books")}>books</button>
        <button onClick={() => navigate("/add")}>add book</button>
        <button onClick={() => navigate("/recommendations")}>
          recommendations
        </button>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default App;
