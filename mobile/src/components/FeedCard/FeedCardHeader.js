import React from 'react';
import styled from 'styled-components/native';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

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

export default function FeedCardHeader({ avatar, first_name, last_name, createdAt, username }) {
  return (
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
  );
}
