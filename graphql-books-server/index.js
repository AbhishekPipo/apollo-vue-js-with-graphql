const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Sample data
const books = [
  {
    id: '1',
    title: 'Reactive Spring',
    pages: 484,
    rating: 5,
    author: {
      id: '1',
      firstName: 'Josh',
      lastName: 'Long',
    },
  },
  {
    id: '2',
    title: 'Spring Boot Up & Running',
    pages: 328,
    rating: 4,
    author: {
      id: '2',
      firstName: 'Mark',
      lastName: 'Heckler',
    },
  },
  {
    id: '3',
    title: 'Hacking with Spring Boot 2.3',
    pages: 392,
    rating: 3,
    author: {
      id: '3',
      firstName: 'John',
      lastName: 'Doe',
    },
  },
];

// GraphQL schema
const typeDefs = gql`
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }

  type Book {
    id: ID!
    title: String!
    pages: Int!
    rating: Int! # Int instead of Rating
    author: Author!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

// Resolvers
const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find(book => book.id === args.id),
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

const startServer = async () => {
  // Start the Apollo Server
  await server.start();
  
  // Apply middleware to connect Apollo Server with Express
  server.applyMiddleware({ app });

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// Call the function to start the server
startServer();
