import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`;
export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $publishingYear: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $publishingYear
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`;

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
      books {
        title
        author
        id
        published
        genres
      }
      bookCount
    }
  }
`;
