import React from 'react';
import { createAppContainer } from 'react-navigation';

import { StackNavigator } from './routes';

const AppContainer = createAppContainer(StackNavigator);

const App = () => {
  return <AppContainer />;
};

export default App;
