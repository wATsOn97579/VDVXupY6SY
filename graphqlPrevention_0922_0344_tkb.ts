// 代码生成时间: 2025-09-22 03:44:15
import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

// 定义一个 Prisma 客户端，用于数据库操作
const prisma = new PrismaClient();

// GraphQL schema 的定义
const typeDefs = gql"""
type Query {
  getUserById(id: ID!): User
}
type User {
  id: ID!
  name: String
  email: String
}
""";

// 解析器定义，根据操作类型解析字段并执行数据库操作
const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      try {
        // 使用参数化查询防止SQL注入
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        // 错误处理
        console.error(error);
        throw new Error('Failed to fetch user');
      }
    },
  },
};

// 启动 Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 为了更好的错误跟踪和调试，启用错误追踪
  formatError: (error) => ({
    name: error.name,
    message: error.message,
    extensions: error.extensions,
    locations: error.locations,
    path: error.path,
  }),
  // 启用调试日志
  context: () => ({
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});