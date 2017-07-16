import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { colors } from '../utils/constants';

const ICON_FONT_SIZE = 20;

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

const CardHeader = styled.View`
  height: 50;
  flexDirection: row;
  alignItems: center;
`;

const CardAvatarContainer = styled.View`
  flex: 0.2;
`;

const CardAvatar = styled.Image`
  height: 40;
  width: 40;
  borderRadius: 20;
`;

const CardMetaContainer = styled.View`
  flex: 1;
`;

const CardMetaTopContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
`;

const CardMetaBottomContainer = styled.View`
  flex: 0.8;
  alignItems: flex-start;
  justifyContent: center;
`;

const CardMetaFullName = styled.Text`
  fontSize: 16;
  fontWeight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const CardMetaText = styled.Text`
  fontSize: 14;
  fontWeight: 600;
  color: ${props => props.theme.LIGHT_GRAY};
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

const CardBottomContainer = styled.View`
  height: 40;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`;

const CardBottomButton = styled(Touchable).attrs({
  feedback: 'opacity',
}) `
  flex: 1;
  justifyContent: space-around;
  alignItems: center;
  flexDirection: row;
  paddingHorizontal: 30px;
`;

const CardBottomButtonText = styled.Text`
  color: ${props => props.theme.LIGHT_GRAY};
  fontSize: 14;
  fontWeight: 500;
`;

export default function FeedCard({ text, createdAt, user: { avatar, first_name, last_name, username } }) {
  return (
    <Card>
      <CardHeader>
        <CardAvatarContainer>
          <CardAvatar source={{ uri: avatar }} />
        </CardAvatarContainer>
        <CardMetaContainer>
          <CardMetaTopContainer>
            <CardMetaFullName>
              {first_name} {last_name}
            </CardMetaFullName>
            <CardMetaText style={{ marginLeft: 5 }}>
              @{username}
            </CardMetaText>
          </CardMetaTopContainer>
          <CardMetaBottomContainer>
            <CardMetaText>
              {distanceInWordsToNow(createdAt)}
            </CardMetaText>
          </CardMetaBottomContainer>
        </CardMetaContainer>
      </CardHeader>
      <CardContentContainer>
        <CardContentText>
          {text}
        </CardContentText>
      </CardContentContainer>
      <CardBottomContainer>
        <CardBottomButton>
          <SimpleLineIcons name="bubble" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
          <CardBottomButtonText>3</CardBottomButtonText>
        </CardBottomButton>
        <CardBottomButton>
          <Entypo name="retweet" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
          <CardBottomButtonText>10</CardBottomButtonText>
        </CardBottomButton>
        <CardBottomButton>
          <Entypo name="heart" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
          <CardBottomButtonText>25</CardBottomButtonText>
        </CardBottomButton>
      </CardBottomContainer>
    </Card>
  );
}
