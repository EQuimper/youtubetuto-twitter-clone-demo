import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import FeedCard from '../components/FeedCard/FeedCard';
import Loading from '../components/Loading';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Root = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  paddingTop: 5;
`;

class HomeScreen extends Component {
  render() {
    const { data } = this.props;

    if (data.loading) {
      return <Loading />;
    }
    return (
      <Root>
        {data.getTweets.map(item => (
          <FeedCard {...item} key={item._id} />
        ))}
      </Root>
    );
  }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);
