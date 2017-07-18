import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import ProfileHeader from '../components/ProfileHeader';
import FeedCard from '../components/FeedCard/FeedCard';
import GET_USER_TWEETS_QUERY from '../graphql/queries/getUserTweets';
import { getUserInfo } from '../actions/user';

const Root = styled.View`
  flex: 1;
  backgroundColor: #F1F6FA;
`;

class ProfileScreen extends Component {
  state = {}

  _renderItem = ({ item }) => <FeedCard {...item} key={item._id} />

  _renderPlaceholder = ({ item }) => <FeedCard placeholder key={item} isLoaded={this.props.getUserTweetsQuery.loading} />

  render() {
    const { getUserTweetsQuery, info } = this.props;
    return (
      <Root>
        <ProfileHeader {...info} />
        {getUserTweetsQuery.loading ? (
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={[1, 2, 3]}
            renderItem={this._renderPlaceholder}
            keyExtractor={item => item}
          />
        ) : (
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={getUserTweetsQuery.getUserTweets}
            renderItem={this._renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </Root>
    );
  }
}

export default compose(
  graphql(GET_USER_TWEETS_QUERY, { name: 'getUserTweetsQuery' }),
  connect(state => ({ info: state.user.info }))
)(ProfileScreen);
