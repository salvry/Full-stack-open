import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = () => {
  const [genreFilter, setGenreFilter] = useState("all");

  const result = useQuery(ALL_BOOKS);
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = new Set(books.flatMap((book) => book.genres));

  const selectGenreFilter = (event) => {
    setGenreFilter(event.target.value);
  };

  const booksToShow =
    genreFilter === "all"
      ? books
      : books.filter((book) => book.genres.includes(genreFilter));
  console.log(books);
  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(genres).map((genre) => (
          <button key={genre} onClick={selectGenreFilter} value={genre}>
            {genre}
          </button>
        ))}
        <button value="all" onClick={selectGenreFilter}>
          all
        </button>
      </div>
    </div>
  );
};

export default Books;
