import React from 'react';
import { ThemeProvider } from 'styled-components';

import Navigation from './src/navigation';
import { colors } from './src/utils/constants';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <Navigation />
      </ThemeProvider>
    );
  }
}
