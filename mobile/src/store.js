import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import thunk from 'redux-thunk';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import reducers from './reducers';

const networkInterface = createNetworkInterface({ uri: 'http://192.168.1.67:3000/graphql' });
// const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql' });

const wsClient = new SubscriptionClient('ws://192.168.1.67:3000/subscriptions', {
// const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
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
  composeWithDevTools(applyMiddleware(client.middleware(), thunk))
);
