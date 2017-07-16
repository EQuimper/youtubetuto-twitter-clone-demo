import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from './src/navigation';
import store, { client } from './src/store';
import { colors } from './src/utils/constants';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigator />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
