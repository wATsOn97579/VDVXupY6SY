// 代码生成时间: 2025-09-18 14:32:04
import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

// Define the type for the data source
interface Query {
  getUserById: (id: number) => User;
  listUsers: () => User[];
}

// Define the type for the user data
interface User {
  id: number;
  name: string;
  email: string;
}

// Initialize the Prisma client
const prisma = new PrismaClient();

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    getUserById(id: Int!): User
    listUsers: [User]
  }
  type User {
    id: Int!
    name: String!
    email: String!
  }
`;

// Define the resolvers
const resolvers: Resolvers = {
  Query: {
    getUserById: async (_, args) => {
      try {
        // Use parameterized queries to prevent SQL injection
        const user = await prisma.user.findUnique({
          where: { id: args.id },
        });
        return user;
      } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
    listUsers: async () => {
      try {
        // Use parameterized queries to prevent SQL injection
        const users = await prisma.user.findMany();
        return users;
      } catch (error) {
        // Handle errors gracefully
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});