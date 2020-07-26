const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const { tasks, users } = require('./constants');
const resolvers = require('./resolvers');

dotEnv.config();

const app = express();

app.use(cors());

app.use(express.json());

const typeDefs = gql`
  type Query {
    greeting: String!
    greetings: [String!]!
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
    user(id: ID!): User
  }

  type Mutation {
    createTask(input: createTaskInput): Task
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    rating: Int!
    user: User!
  }
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers  
});
apolloServer.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT_API || 3000;

app.use('/', (req, res, next) => {
  res.send({ message: 'hello, dude' });
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${ apolloServer.graphqlPath }`);
});