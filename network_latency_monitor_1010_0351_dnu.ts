// 代码生成时间: 2025-10-10 03:51:22
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { fetch } from 'cross-fetch';
import { performance } from 'perf_hooks';

// Define the type definitions using GraphQL
const typeDefs = gql"""
  type Query {
    latencyCheck(url: String!): LatencyData!
  }

  type LatencyData {
    timestamp: String!
    url: String!
    latency: Float!
  }
""";

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    latencyCheck: async (_, { url }) => {
      // Validate the URL to ensure it's a string and not empty
      if (typeof url !== 'string' || url.trim() === '') {
        throw new Error('URL must be a non-empty string.');
      }

      try {
        // Record the start time before the fetch operation
        const startTime = performance.now();
        // Perform a GET request to the provided URL
        const response = await fetch(url, { method: 'GET' });
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`Failed to fetch URL: ${url}, status: ${response.status}`);
        }
        // Record the end time after the fetch operation
        const endTime = performance.now();
        // Calculate the latency
        const latency = endTime - startTime;

        // Return the latency data including the timestamp, URL, and latency
        return {
          timestamp: new Date().toISOString(),
          url,
          latency,
        };
      } catch (error) {
        // Handle any errors that occur during the fetch operation
        throw new Error(`An error occurred while checking latency: ${error.message}`);
      }
    },
  },
};

// Configure the Apollo Server with the type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server and listen for incoming requests
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// The above code sets up an Apollo Server with a single query that checks
// the latency of a given URL. It records the latency and returns it
// along with the timestamp and URL. Error handling is included to
// manage any issues that may arise during the fetch operation.
