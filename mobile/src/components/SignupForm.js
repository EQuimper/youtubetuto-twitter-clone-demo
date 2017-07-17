import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Platform, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, fakeAvatar } from '../utils/constants';
import SIGNUP_MUTATION from '../graphql/mutations/signup';
import Loading from '../components/Loading';
import { login } from '../actions/user';

const Root = styled.View`
  justifyContent: center;
  flex: 1;
  alignItems: center;
  zIndex: 1;
  position: relative;
`;

const Wrapper = styled(KeyboardAwareScrollView).attrs({
  resetScrollToCoords: { x: 0, y: 0 },
  contentContainerStyle: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  scrollEnabled: false,
}) `
  width: 90%;
`;

const InputWrapper = styled.View`
  height: 50;
  justifyContent: flex-end;
  alignItems: center;
  width: 80%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
  marginVertical: 5;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' && colors.WHITE,
  autoCorrect: false,
  autoCapitalize: 'none',
}) `
  height: 30;
  width: 100%;
  color: ${props => props.theme.WHITE};
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
  zIndex: 1;
`;

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  justifyContent: center;
  alignItems: center;
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  shadowColor: #000;
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`;

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false,
  }
  _onChangeText = (text, type) => this.setState({ [type]: text });

  _checkIfDisabled() {
    const { fullName, email, password, username } = this.state;

    if (!fullName || !email || !password || !username) {
      return true;
    }

    return false;
  }

  _onSignupPress = async () => {
    this.setState({ loading: true });
    const { fullName, email, password, username } = this.state;
    const { data } = await this.props.mutate({
      variables: { fullName, email, password, username, avatar: fakeAvatar },
    });
    this.setState({ loading: false });
    try {
      await AsyncStorage.setItem('@twitterclonedemo:token', data.signup.token);
      this.props.login(data.signup.token);
    } catch (error) {
      throw error;
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <Loading />
        </Root>
      );
    }
    return (
      <Root>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              onChangeText={text => this._onChangeText(text, 'fullName')}
              value={this.state.fullName}
              autoCapitalize="words"
              placeholder="Full name"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              value={this.state.email}
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={text => this._onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              value={this.state.password}
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this._onChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              value={this.state.username}
              placeholder="Username"
              onChangeText={text => this._onChangeText(text, 'username')}
            />
          </InputWrapper>
        </Wrapper>
        <ButtonConfirm disabled={this._checkIfDisabled()} onPress={this._onSignupPress}>
          <ButtonConfirmText>Sign Up</ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

const SignupWithGQL = graphql(SIGNUP_MUTATION)(SignupForm);

export default connect(undefined, { login })(SignupWithGQL);
