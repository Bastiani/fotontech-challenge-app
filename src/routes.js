import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import ListProducts from './scenes/product/ListProducts';
import ProductForm from './scenes/product/ProductForm';

const routes = {
  ListProducts: {
    screen: ListProducts,
    navigationOptions: {
      title: 'List Products',
    },
  },
  AddProduct: {
    screen: ProductForm,
    navigationOptions: {
      title: 'Add Product',
    },
  },
  EditProduct: {
    screen: ProductForm,
    navigationOptions: {
      title: 'Edit Product',
      drawerLabel: () => null,
    },
  },
};

export const StackNavigator = createStackNavigator(
  {
    ...routes,
  },
  {
    initialRouteName: 'ListProducts',
    cardStyle: { backgroundColor: 'white' },
  }
);

export const DrawerNavigator = createDrawerNavigator(
  {
    ...routes,
  },
  {
    initialRouteName: 'ListProducts',
    // contentComponent: Menu,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);
