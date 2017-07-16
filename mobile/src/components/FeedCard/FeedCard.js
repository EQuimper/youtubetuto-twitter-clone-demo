import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';
import FAVORITE_TWEET_MUTATION from '../../graphql/mutations/favoriteTweet';

const Card = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.WHITE};
  width: 95%;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowRadius: 2;
  shadowOpacity: 0.1;
  shadowOffset: 0px 2px;
  marginVertical: 5;
  padding: 7px;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  textAlign: left;
  fontSize: 14;
  fontWeight: 500;
  color: ${props => props.theme.SECONDARY};
`;

class FeedCard extends Component {
  render() {
    const { text, createdAt, favorite_count, user } = this.props;
    return (
      <Card>
        <FeedCardHeader createdAt={createdAt} {...user} />
        <CardContentContainer>
          <CardContentText>
            {text}
          </CardContentText>
        </CardContentContainer>
        <FeedCardBottom
          favorite_count={favorite_count}
          onFavoritePress={this.props.favorite}
        />
      </Card>
    );
  }
}

export default graphql(FAVORITE_TWEET_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    favorite: () => mutate({ variables: { _id: ownProps._id } }),
    optimisticResponse: {
      __typename: 'Mutation',
      favoriteTweet: {
        __typename: 'Tweet',
        favorite_count: ownProps.favorite_count + 1,
      },
    },
  }),
})(FeedCard);
