import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";
import { useState, useEffect } from "react";

const Authors = () => {
  const authorsResult = useQuery(ALL_AUTHORS);

  const [authorName, setAuthorName] = useState("");
  const [birthyear, setBirthyear] = useState("");

  const [changeBirthyear, updatedAuthor] = useMutation(EDIT_BIRTHYEAR);

  const updateAuthor = (event) => {
    event.preventDefault();
    const born = Number(birthyear);
    changeBirthyear({ variables: { name: authorName, born: born } });
    setAuthorName("");
    setBirthyear("");
  };

  useEffect(() => {
    if (updatedAuthor.data && updatedAuthor.data.editAuthor === null) {
      alert("Author not found");
    }
  }, [updatedAuthor.data]);

  if (authorsResult.loading) {
    return <div>loading...</div>;
  }
  const authors = authorsResult.data.allAuthors || [];
  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={updateAuthor}>
          <label>Select author</label>
          <select onChange={({ target }) => setAuthorName(target.value)}>
            <option selected={authorName === ""}></option>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <label>Birthyear</label>
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
          <button type="submit">Update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
