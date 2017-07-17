import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import SignupForm from '../components/SignupForm';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.SECONDARY};
  position: relative;
`;

const ButtonLogin = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  backgroundColor: ${props => props.theme.PRIMARY};
  height: 75;
  width: 150;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  right: 0;
  top: 30%;
  borderTopLeftRadius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: bold;
  fontSize: 20;
`;

const BottomTextContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  alignSelf: stretch;
  justifyContent: center;
  alignItems: center;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})`
  justifyContent: center;
  alignItems: center;
`;

const ButtonBottomText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 400;
  fontSize: 16;
`;

const initialState = {
  showSignup: false,
  showLogin: false,
};

export default class LoginScreen extends Component {
  state = initialState

  _onBackPress = () => {
    this.setState(initialState);
  };

  _onShowSignupPress = () => {
    this.setState({ showSignup: true });
  };

  _onShowLoginPress = () => this.setState({ showLogin: true });

  render() {
    if (this.state.showSignup) {
      return (
        <Root>
          <SignupForm onBackPress={this._onBackPress} />
        </Root>
      );
    }
    return (
      <Root>
        <ButtonLogin onPress={this._onShowSignupPress}>
          <ButtonText>Get Started</ButtonText>
        </ButtonLogin>
        <BottomTextContainer>
          <Button>
            <ButtonBottomText>Already have an account?</ButtonBottomText>
          </Button>
        </BottomTextContainer>
      </Root>
    );
  }
}
