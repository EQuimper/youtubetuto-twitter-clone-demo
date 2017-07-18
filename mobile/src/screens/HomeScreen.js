import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import { FlatList } from 'react-native';

import FeedCard from '../components/FeedCard/FeedCard';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded';
import TWEET_FAVORITED_SUBSCRIPTION from '../graphql/subscriptions/tweetFavorited';

const Root = styled.View`
  paddingTop: 5;
  flex: 1;
`;

class HomeScreen extends Component {
  state = {
    isRefreshing: false,
  }
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

  _renderItem = ({ item }) => <FeedCard {...item} key={item._id} />

  _renderPlaceholder = ({ item }) => <FeedCard placeholder key={item} isLoaded={this.props.data.loading} />

  _onRefresh = async () => {
    this.setState({ isRefreshing: true });
    this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  render() {
    const { data } = this.props;
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
          onRefresh={this._onRefresh}
          refreshing={this.state.isRefreshing}
        />
      </Root>
    );
  }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);
