import React, { Component } from 'react';
import styled from 'styled-components/native';

import { fakeAvatar } from '../utils/constants';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.WHITE};
  paddingTop: 50;
`;

const HeaderContainer = styled.View`
  height: 140;
  alignSelf: stretch;
  borderBottomWidth: 1;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
`;

const Heading = styled.View`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-start;
  paddingLeft: 15;
  paddingTop: 5;
`;

const Avatar = styled.Image`
  height: 60;
  width: 60;
  borderRadius: 30;
`;

const UsernameContainer = styled.View`
  flex: 1;
  paddingLeft: 10;
`;

const Fullname = styled.Text`
  color: ${props => props.theme.SECONDARY};
  fontWeight: bold;
  fontSize: 18;
`;

const Username = styled.Text`
  color: ${props => props.theme.SECONDARY};
  opacity: 0.8;
  fontSize: 15;
`;

const MetaContainer = styled.View`
  flex: 0.8;
  flexDirection: row;
`;

const MetaBox = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const MetaText = styled.Text`
  color: ${props => props.theme.SECONDARY};
  fontSize: 16;
  fontWeight: 600;
`;

const MetaTextNumber = styled.Text`
  color: ${props => props.theme.PRIMARY};
`;

export default class ProfileScreen extends Component {
  state = { }
  render() {
    return (
      <Root>
        <HeaderContainer>
          <Heading>
            <Avatar source={{ uri: fakeAvatar }} />
            <UsernameContainer>
              <Fullname>
                Emanuel Quimper
              </Fullname>
              <Username>
                @EQuimper
              </Username>
            </UsernameContainer>
          </Heading>
          <MetaContainer>
            <MetaBox>
              <MetaText>
                <MetaTextNumber>5</MetaTextNumber> tweets
              </MetaText>
            </MetaBox>
            <MetaBox>
              <MetaText>
                <MetaTextNumber>5</MetaTextNumber> likes
              </MetaText>
            </MetaBox>
          </MetaContainer>
        </HeaderContainer>
      </Root>
    );
  }
}
