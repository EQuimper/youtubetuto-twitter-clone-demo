/* eslint-disable no-console */

import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'jsonwebtoken';
import { execute, subscribe } from 'graphql';

import './config/db';
import config from './config/config';
import mock from './mock';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

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
    endpointURL: config.GRAPHQL_PATH,
    // subscriptionsEndpoint: `ws://localhost:${config.PORT}${config.SUBSCRIPTIONS_PATH}`,
  }),
);

app.use(
  config.GRAPHQL_PATH,
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  })),
);

const graphQLServer = createServer(app);

// mock().then(() => {
graphQLServer.listen(config.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    new SubscriptionServer({
      schema,
      execute,
      subscribe,
    }, {
      server: graphQLServer,
      path: config.SUBSCRIPTIONS_PATH,
    });
    console.log(`Graphiql listen on: http://localhost:${config.PORT}/graphiql`);
  }
});
// });
