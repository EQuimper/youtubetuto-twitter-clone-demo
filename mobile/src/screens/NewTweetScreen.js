import React, { Component } from 'react';
import { Platform, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import Touchable from '@appandflow/touchable';

import { colors, fakeAvatar } from '../utils/constants';
import CREATE_TWEET_MUTATION from '../graphql/mutations/createTweet';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`;

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`;

const Input = styled.TextInput.attrs({
  autoFocus: true,
  placeholder: 'What\'s happening ?',
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  multiline: true,
  maxLength: 140,
}) `
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY};
`;

const TextLength = styled.Text`
  position: absolute;
  top: 45%;
  right: 5%;
  color: ${props => props.theme.PRIMARY};
  fontSize: 18;
`;

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 10;
  position: absolute;
  top: 60%;
  right: 0;
`;

const TweetButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 18;
`;

class NewTweetScreen extends Component {
  state = {
    text: '',
  }

  _onChangeText = text => this.setState({ text });

  _onCreationPress = async () => {
    await this.props.mutate({
      variables: {
        text: this.state.text,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTweet: {
          __typename: 'Tweet',
          user: {
            __typename: 'User',
            username: 'EQuimper',
            avatar: fakeAvatar,
            first_name: 'Emanuel',
            last_name: 'Quimper',
          },
          text: this.state.text,
          favorite_count: 0,
          _id: -1,
          isFavorited: false,
          createdAt: new Date(),
        },
      },
      update: (store, { data: { createTweet } }) => {
        const data = store.readQuery({ query: GET_TWEETS_QUERY });
        store.writeQuery({ query: GET_TWEETS_QUERY, data: { getTweets: [{ ...createTweet }, ...data.getTweets] } });
      },
    });
    Keyboard.dismiss();
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Input onChangeText={this._onChangeText} value={this.state.text} />
          <TweetButton onPress={this._onCreationPress} disabled={this.state.text.length === 0}>
            <TweetButtonText>Tweet</TweetButtonText>
          </TweetButton>
          <TextLength>
            {140 - this.state.text.length}
          </TextLength>
        </Wrapper>
      </Root>
    );
  }
}

export default graphql(CREATE_TWEET_MUTATION)(NewTweetScreen);
