import React from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Entypo, SimpleLineIcons } from '@expo/vector-icons';

import { colors } from '../../utils/constants';

const ICON_FONT_SIZE = 20;

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

export default function FeedCardBottom({ favorite_count, onFavoritePress }) {
  return (
    <CardBottomContainer>
      <CardBottomButton>
        <SimpleLineIcons name="bubble" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
        <CardBottomButtonText>3</CardBottomButtonText>
      </CardBottomButton>
      <CardBottomButton>
        <Entypo name="retweet" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
        <CardBottomButtonText>10</CardBottomButtonText>
      </CardBottomButton>
      <CardBottomButton onPress={onFavoritePress}>
        <Entypo name="heart" size={ICON_FONT_SIZE} color={colors.LIGHT_GRAY} />
        <CardBottomButtonText>{favorite_count}</CardBottomButtonText>
      </CardBottomButton>
    </CardBottomContainer>
  );
}
