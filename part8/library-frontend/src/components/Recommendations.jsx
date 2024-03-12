import { useQuery } from "@apollo/client";
import { LOGGED_USER, BOOKS_BY_GENRE } from "../queries";
import { useState, useEffect } from "react";

const Recommendations = () => {
  const resultUser = useQuery(LOGGED_USER);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    if (resultUser.data) {
      const genre = resultUser.data.me.favoriteGenre;
      setGenre(genre);
    }
  }, [resultUser.data]);

  const resultBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (resultUser.loading || resultBooks.loading) {
    return <div>loading...</div>;
  }

  const recommendedBooks = resultBooks.data.allBooks;
  console.log(recommendedBooks);

  return (
    <div>
      <h2>books for you</h2>
      <p>
        Books in your favorite genre <strong>{genre}</strong>
      </p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
