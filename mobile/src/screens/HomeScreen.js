import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import FeedCard from '../components/FeedCard/FeedCard';
import Loading from '../components/Loading';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded';
import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';

const Root = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  paddingTop: 5;
`;

class HomeScreen extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: TWEET_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newTweet = subscriptionData.data.tweetAdded;
        if (!prev.getTweets.find((tweet) => tweet._id === newTweet._id)) {
          return {
            ...prev,
            getTweets: [{ ...newTweet }, ...prev.getTweets],
          };
        }
        return prev;
      },
    });
    this.props.data.subscribeToMore({
      document: TWEET_FAVORITED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('====================================');
        console.log(subscriptionData);
        console.log('====================================');
        console.log('====================================');
        console.log('prev', prev);
        console.log('====================================');
        if (!subscriptionData.data) {
          return prev;
        }
        const newTweet = subscriptionData.data.tweetFavorited;
        return {
          ...prev,
          getTweets: prev.getTweets.map(tweet =>
            (tweet._id === newTweet._id ?
              {
                ...tweet,
                favorite_count: newTweet.favorite_count,
              }
              : tweet)
          ),
        };
      },
    });
  }
  render() {
    const { data } = this.props;

    console.log('====================================');
    console.log(data);
    console.log('====================================');

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
