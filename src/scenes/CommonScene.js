import React from 'react';
import { Button, Icon } from 'native-base';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

const SafeAreaViewStyled = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: #22211f;
`;

const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const Header = styled.View`
  flex: 1;
  max-height: 50px;
  background-color: #1d3557;
  justify-content: space-between;
  flex-direction: row;
`;

const CommonScene = ({ children, navigation }) => {
  return (
    <SafeAreaViewStyled>
      <Container>
        <Header>
          {navigation.state.routeName !== 'ListProducts' && (
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          )}
          {/* <Title>Header</Title> */}
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Header>
        <Content>{children}</Content>
      </Container>
    </SafeAreaViewStyled>
  );
};

export default CommonScene;
