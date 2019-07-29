import React from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import styled from 'styled-components/native';

const ContentStyled = styled(Content)`
  background-color: #1d3557;
`;

const CommonScene = ({ children, navigation }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
      <ContentStyled>{children}</ContentStyled>
    </Container>
  );
};

export default CommonScene;
