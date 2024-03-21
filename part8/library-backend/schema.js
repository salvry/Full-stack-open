const typeDefs = `
type Author{
  name: String!
  id: ID!
  born: Int
  books: [Book!]!
  bookCount: Int!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String): [Book!]!
    allAuthors: [Author!]!
    booksByAuthor(name:String!): [Book!]!
    bookCountByAuthor(name:String!): Int! 
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book

    addAuthor(
      name:String!
      born:Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;
module.exports = typeDefs;
