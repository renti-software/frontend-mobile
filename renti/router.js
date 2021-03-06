import React from "react";
import NavigationService from "./components/NavigationService";

import {
  Platform,
  TouchableOpacity
} from "react-native";


import Marketplace from './screens/Marketplace'
import Product from './screens/Product'
import Favourites from './screens/Favourites'
import Login from './screens/Login'
import Register from './screens/Register'

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import colors from "./constants/Colors";
import { Ionicons, Foundation, AntDesign } from "@expo/vector-icons";

const LoginStack = createStackNavigator(
  //SignedOut Stack
  {
    //Defination of Navigaton from home screen
    
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown:false
      },
    },

    Register: {
      screen: Register,
      navigationOptions: {
        headerShown:false
      },
    },
    
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
      }
    }
  }
);

const RentalsNavigator = createStackNavigator(
  //Signed In Stack
  {
    Favourites: {
      screen: Favourites,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#2a9d8f',

        },
        headerTitleStyle: {
          color: "white"
        },
        title: "My Favourites"
      }
    },

  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2a9d8f',
      },
      headerTitleStyle: {
        color: "white"
      },
      title: "My Favourites"
    }),
    tabBarOptions: {
      activeTintColor: "#c73737",
      inactiveTintColor: "gray"
    }
  }
);

const MarketplaceNavigator = createStackNavigator(
  //Signed In Stack
  {
    Marketplace: {
      screen: Marketplace,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#2a9d8f',

        },
        headerTitleStyle: {
          color: "white"
        },
        title: "Marketplace"
      }
    },

    Product: {
      screen: Product,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#2a9d8f',

        },
        headerTitleStyle: {
          color: "white"
        },
        title: "Product"
      }
    },
    
  },
  {
    initialRouteName: "Marketplace",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#2a9d8f',
      },
      headerTitleStyle: {
        color: "white"
      },
      title: "Marketplace"
    })
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
          <Ionicons name="md-pricetags" color={tintColor} size={25} />
        )
      }
    },

    Stats: {
      screen: RentalsNavigator,
      navigationOptions: {
        tabBarLabel: "Favourites",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-star" color={tintColor} size={25} />
        )
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({}),
    tabBarOptions: {
      activeTintColor: '#2a9d8f',
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
  },
  {
    initialRouteName: "Auth",
    navigationOptions : {
      tintColor : "white",
      headerTintStyle:"#ffffff"
    }
  }
);

export default createAppContainer(AppNavigatorFinal);
