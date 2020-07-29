const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const taskTypeDefs = require('./task');

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
    # greeting: String!
    # greetings: [String!]!
  }

  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  userTypeDefs,
  taskTypeDefs
]