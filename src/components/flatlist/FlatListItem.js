import * as React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';

const ButtonStyled = styled.TouchableOpacity`
  background-color: #457b9d;
  justify-content: center;
  height: 60px;
  padding: 0 15px;
  border-top-color: #5587a5;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-bottom-color: #3f708f;
`;

const ItemTitle = styled.Text`
  color: #f1faee;
`;

const ItemDescription = styled.Text`
  color: #f1faee;
`;

const ListItem = ({
  id,
  onPressItem,
  title,
  description,
  children,
  swipeOutOptions,
}) => {
  const onPress = () => {
    onPressItem(id);
  };

  const swipeProps = {
    backgroundColor: '#fdfffc',
    autoClose: true,
    right: swipeOutOptions,
  };
  return (
    <Swipeout {...swipeProps}>
      <ButtonStyled onPress={onPress}>
        {title && (
          <View>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </View>
        )}
        {children}
      </ButtonStyled>
    </Swipeout>
  );
};

export default ListItem;
