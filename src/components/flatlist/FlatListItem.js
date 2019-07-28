import * as React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Swipeout from 'react-native-swipeout';

const ButtonStyled = styled.TouchableOpacity`
  background-color: #f6f7f8;
  justify-content: center;
  height: 60px;
  padding: 0 15px;
  border-top-color: #fff;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-bottom-color: #eceef3;
`;

const ItemTitle = styled.Text`
  color: #7c828e;
`;

const ItemDescription = styled.Text`
  color: #9fa7b6;
`;

class ListItem extends React.PureComponent {
  _onPress = () => {
    const { id, onPressItem } = this.props;
    onPressItem(id);
  };

  render() {
    const { title, children, swipeOutOptions } = this.props;

    const swipeProps = {
      backgroundColor: '#fdfffc',
      autoClose: true,
      right: swipeOutOptions,
    };
    return (
      <Swipeout {...swipeProps}>
        <ButtonStyled onPress={this._onPress}>
          {title && (
            <View>
              <ItemTitle>{title}</ItemTitle>
              <ItemDescription>Descrição</ItemDescription>
            </View>
          )}
          {children}
        </ButtonStyled>
      </Swipeout>
    );
  }
}

export default ListItem;
