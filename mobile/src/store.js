
import { createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import reducers from './reducers';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:3000/graphql' });

export const client = new ApolloClient({
  networkInterface,
});

export default createStore(
  reducers(client),
  undefined,
);
