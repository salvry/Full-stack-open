import { useQuery } from "@apollo/client";
import { LOGGED_USER, ALL_BOOKS } from "../queries";

const Recommendations = () => {
  const resultUser = useQuery(LOGGED_USER);
  const resultBooks = useQuery(ALL_BOOKS);

  if (resultUser.loading || resultBooks.loading) {
    return <div>loading...</div>;
  }

  const user = resultUser.data;
  const books = resultBooks.data.allBooks;

  const recommendedBooks = Array.from(
    books.filter((book) => book.genres.includes(user.me.favoriteGenre))
  );

  return (
    <div>
      <h2>books for you</h2>
      <p>
        Books in your favorite genre <strong>{user.me.favoriteGenre}</strong>
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
