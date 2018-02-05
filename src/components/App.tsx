import * as React from 'react';
import styled from 'styled-components/native';

const AppView = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 1;
  background-color: #222;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  color: white;
`;

const Intro = styled.Text`
  flex: 2;
  font-size: 30px;
  text-align: center;
`;

import { LoginForm } from '../forms/LoginForm';

export class App extends React.Component {
  render() {
    return (
      <AppView>
        <Header>
          <Title>Welcome to React ⚛️</Title>
        </Header>
        <Intro>
          To get started, edit src/components/App.tsx and save to reload.
          <LoginForm/>
        </Intro>
      </AppView>
    );
  }
}
