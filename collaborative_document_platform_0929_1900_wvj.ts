// 代码生成时间: 2025-09-29 19:00:29
import { ApolloServer, gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

// 定义数据模型
interface Document {
  id: string;
  content: string;
  contributors: string[];
}

// 定义数据存储
const documents: Document[] = [];

// 定义GraphQL schema
const typeDefs: DocumentNode = gql\`
  type Document {
    id: ID!
    content: String!
    contributors: [String!]!
  }

  type Query {
    getDocument(id: ID!): Document
  }

  type Mutation {
    addDocument(content: String!): Document
    updateDocument(id: ID!, content: String!): Document
    addContributor(id: ID!, contributor: String!): Document
  }
\`;

// 定义resolvers
const resolvers = {
  Query: {
    getDocument: async (_, { id }) => {
      const doc = documents.find(d => d.id === id);
      if (!doc) {
        throw new Error("Document not found.");
      }
      return doc;
    },
  },
  Mutation: {
    addDocument: async (_, { content }) => {
      const newDoc: Document = {
        id: uuidv4(),
        content: content,
        contributors: [],
      };
      documents.push(newDoc);
      return newDoc;
    },
    updateDocument: async (_, { id, content }) => {
      const doc = documents.find(d => d.id === id);
      if (!doc) {
        throw new Error("Document not found.");
      }
      const updatedDoc = { ...doc, content: content };
      const index = documents.findIndex(d => d.id === id);
      documents[index] = updatedDoc;
      return updatedDoc;
    },
    addContributor: async (_, { id, contributor }) => {
      const doc = documents.find(d => d.id === id);
      if (!doc) {
        throw new Error("Document not found.");
      }
      const updatedDoc = { ...doc, contributors: [...doc.contributors, contributor] };
      const index = documents.findIndex(d => d.id === id);
      documents[index] = updatedDoc;
      return updatedDoc;
    },
  },
};

// 创建Apollo Server实例
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // 可以在这里添加上下文信息，例如用户认证信息等
  }),
  playground: true,
  introspection: true,
});

// 启动服务
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// 以上代码定义了一个基本的文档协作平台服务，包括创建文档、更新文档内容和添加贡献者的功能。
// 每个文档都有一个唯一的ID，并且可以被多个贡献者共享。