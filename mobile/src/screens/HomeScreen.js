import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import FeedCard from '../components/FeedCard';
import { colors } from '../utils/constants';

const Root = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center'
  }
})`
  paddingTop: 5;
`;

const user = {
  avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  first_name: 'Misty',
  last_name: 'Sutton',
  username: 'mistySutton15'
}

export default class HomeScreen extends Component {
  render() {
    return (
      <Root>
        <FeedCard {...user} />
        <FeedCard {...user} />
        <FeedCard {...user} />
        <FeedCard {...user} />
        <FeedCard {...user} />
        <FeedCard {...user} />
      </Root>
    );
  }
}