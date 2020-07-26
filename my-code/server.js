const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const { tasks, users } = require('./constants');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

dotEnv.config();

const app = express();

app.use(cors());

app.use(express.json());

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