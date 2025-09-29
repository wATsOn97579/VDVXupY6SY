// 代码生成时间: 2025-09-30 03:54:22
import { ApolloServer, gql } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import { promisify } from 'util';

// GraphQL Schema
const typeDefs = gql`
  type Query {
    encryptData(data: String!, key: String!): String
    decryptData(data: String!, key: String!): String
  }
`;

// Resolvers
const resolvers = {
  Query: {
    async encryptData(_, { data, key }) {
      try {
        const iv = randomBytes(16);
        const derivedKey = scryptSync(key, 'salt', 32);
        const cipher = createCipheriv('aes-256-cbc', derivedKey, iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
      } catch (error) {
        throw new Error('Encryption failed: ' + error.message);
      }
    },
    async decryptData(_, { data, key }) {
      try {
        const [iv, encrypted] = data.split(':');
        const derivedKey = scryptSync(key, 'salt', 32);
        const decipher = createDecipheriv('aes-256-cbc', derivedKey, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
      } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
      }
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Add any additional context if required
  }),
  playground: true,
  introspection: true,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});