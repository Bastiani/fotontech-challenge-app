import React from 'react';
import { createAppContainer } from 'react-navigation';

import { DrawerNavigator } from './routes';

const AppContainer = createAppContainer(DrawerNavigator);

const App = () => {
  return <AppContainer />;
};

export default App;
