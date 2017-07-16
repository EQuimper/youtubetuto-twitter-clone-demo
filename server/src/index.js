/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';

import './config/db';
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

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.use(
  '/graphql',
  graphqlExpress({
    schema,
  }),
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
