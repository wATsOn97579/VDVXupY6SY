// 代码生成时间: 2025-10-03 00:00:28
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { QueryArgs, Resolvers } from './types';

// 决策树节点类型
interface TreeNode {
  id: string;
  question: string;
  options: { [key: string]: string };
  nextNodeId?: string;
}

// 决策树类型
interface DecisionTree {
  root: TreeNode;
}

// 构建决策树的函数，返回根节点
function buildDecisionTree(): DecisionTree {
  // 示例决策树结构
  const root: TreeNode = {
    id: '1',
    question: 'What is your favorite color?',
    options: {
      red: '2',
      blue: '3',
      green: '4',
    },
  };

  // 根据选项构建子节点
  const node2: TreeNode = {
    id: '2',
    question: 'Do you like fruits?',
    options: {
      yes: '5',
      no: '6',
    },
  };

  const node3: TreeNode = {
    id: '3',
    question: 'Do you like vegetables?',
    options: {
      yes: '7',
      no: '8',
    },
  };

  const node4: TreeNode = {
    id: '4',
    question: 'Do you prefer salty or sweet?',
    options: {
      salty: '9',
      sweet: '10',
    },
  };

  // 构建决策树
  return { root };
}

// GraphQL 查询解析器
const resolvers: Resolvers = {
  Query: {
    decisionTree: async (parent: any, args: QueryArgs): Promise<DecisionTree> => {
      try {
        return buildDecisionTree();
      } catch (error) {
        console.error('Error building decision tree:', error);
        throw new Error('Failed to build decision tree');
      }
    },
  },
};

// GraphQL Schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      decisionTree: {
        type: new GraphQLNonNull(new GraphQLObjectType({
          name: 'DecisionTree',
          fields: {
            root: { type: new GraphQLNonNull(new GraphQLObjectType({ name: 'TreeNode', fields: { id: { type: GraphQLString }, question: { type: GraphQLString }, options: { type: GraphQLString } }) }) },
          },
        })),
        resolve: resolvers.Query.decisionTree,
      },
    },
  }),
});

export default schema;