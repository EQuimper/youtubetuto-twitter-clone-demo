import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Touchable from '@appandflow/touchable';

import FeedCard from '../components/FeedCard/FeedCard';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded';
import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';

const Root = styled.View`
  paddingTop: 5;
  flex: 1;
`;

const Avatar = styled.Image`
  height: 30;
  width: 30;
  borderRadius: 15;
`;

const ButtonRight = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  marginRight: 15;
  justifyContent: center;
  alignItems: center;
`;

const ButtonLeft = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  marginLeft: 15;
  justifyContent: center;
  alignItems: center;
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

  _renderItem = ({ item }) => {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    return <FeedCard {...item} key={item._id} />;
  }

  _renderPlaceholder = ({ item }) => {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    return <FeedCard placeholder key={item} isLoaded={this.props.data.loading} />;
  }

  render() {
    const { data } = this.props;
    console.log('====================================');
    console.log(this.props);
    console.log('====================================');
    if (data.loading) {
      return (
        <Root>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={[1, 2, 3]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
          />
        </Root>
      );
    }
    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
        />
      </Root>
    );
  }
}

export default compose(graphql(GET_TWEETS_QUERY), connect(state => state.user))(HomeScreen);
