import React from 'react';
import { AppLoading } from 'expo';
import { UIManager, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import AppNavigator from './src/navigation';
import { store, client } from './src/store';
import { colors } from './src/utils/constants';
// import { cacheImages, images } from './src/utils/helpers/cacheImages';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  state = {
    appIsReady: false,
    // imagesIsReady: false,
  }

  componentDidMount() {
    // this._loadAssetsAsync();
    this._checkIfToken();
  }

  _checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@twitterclonedemo:token');
      if (token !== null) {
        store.dispatch({ type: 'LOGIN' });
      }
    } catch (error) {
      //
    }

    this.setState({ appIsReady: true });
  }

  // async _loadAssetsAsync() {
  //   await cacheImages(images);

  //   this.setState({ imagesIsReady: true });
  // }

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigator />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
