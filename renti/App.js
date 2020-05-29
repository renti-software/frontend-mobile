import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Marketplace from './screens/Marketplace.js'
import Product from './screens/Product.js'
import Login from './screens/Login.js'
import Register from './screens/Register.js'

import AppNavigatorFinal from "./router";
import NavigationService from "./components/NavigationService";


export default function App() {
  return (
    <AppNavigatorFinal
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
