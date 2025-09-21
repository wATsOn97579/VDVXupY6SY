// 代码生成时间: 2025-09-21 11:41:17
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserResolver } from './resolvers/UserResolver';
import { User } from './entities/User';

// Define the GraphQL schema using the type-graphql library
const schema = buildSchema({
  resolvers: [UserResolver],
  validate: false,
});

// Initialize the ApolloServer with the schema
const apolloServer = new ApolloServer({
  schema,
  context: () => ({
    // Provide necessary context in the GraphQL context
  }),
  formatError: (error) => {
    // Customize error handling
    console.error(error);
    return error;
  },
});

// Create an Express server
const app = express();

// Connect to the database using TypeORM
createConnection().then(async () => {
  // Start the ApolloServer on the Express server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Listen on port 4000 for incoming requests
  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
  });
}).catch(error => console.error('Error connecting to the database:', error));

// GraphQL type definitions
const typeDefs = gql"""
  type Query {
    hello: String
  }
""";

// Export the ApolloServer instance for testing purposes
export { apolloServer };

// Uncomment the line below to enable GraphQL playground in the browser
// apolloServer.installSubscriptionHandlers(app);

// User entity for database interaction using TypeORM
export class User {
  id: number;
  name: string;
  // Additional user properties
}

// User resolver for GraphQL queries and mutations
export class UserResolver {
  // Resolver methods for handling GraphQL operations
}
