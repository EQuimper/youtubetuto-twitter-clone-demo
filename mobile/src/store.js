import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import reducers from './reducers';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql' });

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

export const client = new ApolloClient({
  networkInterface,
});

export const store = createStore(
  reducers(client),
  undefined,
);
