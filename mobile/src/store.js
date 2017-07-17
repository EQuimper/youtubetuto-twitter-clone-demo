import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from './reducers';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql' });

const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
  connectionParams: {},
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // eslint-disable-line
    }
    try {
      const token = await AsyncStorage.getItem('@twitterclonedemo:token');
      if (token !== null) {
        req.options.headers.authorization = token || null; // eslint-disable-line
      }
    } catch (error) {
      throw error;
    }
    next();
  },
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

export const store = createStore(
  reducers(client),
  undefined,
);
