import React from "react";
import NavigationService from "./components/NavigationService";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  TouchableOpacity
} from "react-native";


import Marketplace from './screens/Marketplace.js'
import Product from './screens/Product.js'
import Login from './screens/Login.js'
import Register from './screens/Register.js'

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from "./components/auth/AuthLoadingScreen";
import colors from "./constants/Colors";
import { Ionicons, Foundation, AntDesign } from "@expo/vector-icons";
import Icon from "./components/Icon";

const LoginStack = createStackNavigator(
  //SignedOut Stack
  {
    //Defination of Navigaton from home screen
    
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    
    Register: {
      screen: Register,
      navigationOptions: {
        headerTintStyle:"#ffffff",
        headerStyle: {
          backgroundColor: colors.primary,
          marginTop: Platform.OS === "android" ? 0 : 20
        },
        headerTitleStyle: {
          color: "white"
        },
        title: "Register"
      }
    },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerTintStyle:"#ffffff",
      headerStyle: {
        marginTop: Platform.OS === "android" ? 0 : 20
      }
    }
  }
);

const MarketplaceNavigator = createStackNavigator(
  //SignedOut Stack
  {
    //Defination of Navigaton from home screen
    
    Marketplace: {
      screen: Marketplace,
      navigationOptions: {
        header: null
      }
    },
    
    Product: {
      screen: Product,
      navigationOptions: {
        headerTintStyle:"#ffffff",
        headerStyle: {
          backgroundColor: colors.primary,
          marginTop: Platform.OS === "android" ? 0 : 20
        },
        headerTitleStyle: {
          color: "white"
        },
        title: "Register"
      }
    },
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerTintStyle:"#ffffff",
      headerStyle: {
        marginTop: Platform.OS === "android" ? 0 : 20
      }
    }
  }
);


const AppNavigator = createBottomTabNavigator(
  //Signed In Stack
  {
    Marketplace: {
      screen: MarketplaceNavigator,
      navigationOptions: {
        tabBarLabel: "Marketplace",
        tabBarIcon: ({ tintColor }) => (
          <Foundation name="book" color={tintColor} size={25} />
        )
      }
    },

    MyRenti: {
      screen: RentalsNavigator,
      navigationOptions: {
        tabBarLabel: "My Rentals",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-stats" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({}),
    headerTintStyle:"#ffffff",
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: "gray",
    }
  }
);

//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+

//Business Mode Routing, mudar nas opçoes
const AppNavigatorFinal = createSwitchNavigator(
  {
    App: {
      screen: AppNavigator
    },

    Auth: {
      screen: LoginStack
    },
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoading",
    navigationOptions : {
      tintColor : "white",
      headerTintStyle:"#ffffff"
    }
  }
);

export default createAppContainer(AppNavigatorFinal);
