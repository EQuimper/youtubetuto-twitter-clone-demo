/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import './config/db';
import config from './config/config';
import mock from './mock';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  console.log('====================================');
  console.log(token);
  console.log('====================================');
  if (token != null) {
    const user = jwt.verify(token, config.JWT_SECRET);
    req.user = user; // eslint-disable-line
  }
  next();
});

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  })),
);

// mock().then(() => {
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Graphiql listen on: http://localhost:${PORT}/graphiql`);
  }
});
// });
