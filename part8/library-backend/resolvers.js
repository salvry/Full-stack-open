const { GraphQLError } = require("graphql");

const { v1: uuid } = require("uuid");

const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),

    authorCount: async () => await Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");
      if (args.author) {
        books = books.filter((book) => book.author.name === args.author);
      }
      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: async () => await Author.find({}),

    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: (root) => {
      return root.books.length;
    },
  },
  Mutation: {
    addAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = new Author({ ...args });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(
          "Failed to add author. Author must have a name with at least 4 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          }
        );
      }
      return author;
    },

    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const authorFound = await Author.findOne({ name: args.author });
      if (authorFound) {
        const book = new Book({
          title: args.title,
          author: authorFound.id,
          published: args.published,
          genres: args.genres,
          id: uuid(),
        });
        authorFound.books.push(book.id);
        try {
          await authorFound.save();
          pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
          await book.save();
          return book.populate("author");
        } catch (error) {
          throw new GraphQLError(
            "Failed to add book. Book must have a name with at least 5 characters",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.name,
                error,
              },
            }
          );
        }
      }
      const newAuthor = new Author({
        name: args.author,
        born: null,
        books: [],
        id: uuid(),
      });

      const book = new Book({
        title: args.title,
        author: newAuthor.id,
        published: args.published,
        genres: args.genres,
        id: uuid(),
      });
      newAuthor.books.push(book.id);
      try {
        await newAuthor.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
        await book.save();
        return book.populate("author");
      } catch (error) {
        throw new GraphQLError(
          "Failed to add book. Book must have a name with at least 5 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          }
        );
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: "" });
      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Saving user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};
module.exports = resolvers;
