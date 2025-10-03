// 代码生成时间: 2025-10-03 21:28:48
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

// Define the GraphQL schema
const typeDefs = gql`
  type Token {
    id: ID!
    name: String!
    quantity: Int!
  }

  type Query {
    tokens: [Token]
    token(id: ID!): Token
  }

  type Mutation {
    createToken(name: String!, quantity: Int!): Token
    updateToken(id: ID!, name: String, quantity: Int): Token
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    tokens: () => tokens,
    token: (_, { id }) => tokens.find(token => token.id === id),
  },
  Mutation: {
    createToken: (_, { name, quantity }) => {
      const newToken = {
        id: uuidv4(),
        name,
        quantity,
      };
      tokens.push(newToken);
      return newToken;
    },
    updateToken: (_, { id, name, quantity }) => {
      const token = tokens.find(token => token.id === id);
      if (!token) {
        throw new Error('Token not found');
      }
      if (name !== undefined) token.name = name;
      if (quantity !== undefined) token.quantity = quantity;
      return token;
    },
  },
};

// In-memory data structure to store tokens
let tokens = [];

// Initialize Apollo Server with typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Context can be used to pass custom data to resolvers
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
 * ApolloServer is configured to use the schema and resolvers defined above.
 * It provides endpoints for creating, updating, and querying tokens.
 * The in-memory array 'tokens' serves as a simple database for storing token data.
 * Error handling is implemented within the resolvers to account for non-existent tokens.
 */
