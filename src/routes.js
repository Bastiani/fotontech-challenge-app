import { createStackNavigator } from 'react-navigation';

import ListProducts from './scenes/product/ListProducts';

export const StackNavigator = createStackNavigator(
  {
    ListProducts: {
      screen: ListProducts,
      navigationOptions: {
        title: 'List Products',
      },
    },
  },
  {
    initialRouteName: 'ListProducts',
    cardStyle: { backgroundColor: 'white' },
  }
);
