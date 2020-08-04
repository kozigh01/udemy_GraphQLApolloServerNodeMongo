const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const { tasks, users } = require('./constants');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { connection } = require('./database/util');
const { verifyUser } = require('./helper/context');

dotEnv.config();

const app = express();

// connect to mongodb
connection();

app.use(cors());

app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {  // when declared as a function, will be evaluated on each request
    await verifyUser(req);
    return { email: req.email }
  }
  // context: {  // when declared as an object, the context is not changed after apollo server is initialized
  //   email: "test@test.com1" + Math.random()  // since is an object, will always return the email with the first generated random number
  // }
});
apolloServer.applyMiddleware({ app, path: '/graphql' });


const PORT = process.env.PORT_API || 3000;

app.use('/', (req, res, next) => {
  res.send({ message: 'hello, you' });
})

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${ apolloServer.graphqlPath }`);
});