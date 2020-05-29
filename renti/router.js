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


import Login from "./screens/Login";
import Register from "./screens/Register";

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
    AppIntro:{
      screen: AppIntro,
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
    FitbitAuth: {
      screen: FitbitAuth,
      navigationOptions: {
        header: null
      }
    }
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

const StatsNavigator = createStackNavigator(
  //Signed In Stack
  {
    Stats: {
      screen: Stats, //CHANGE
      navigationOptions: { headerRight: <HeaderRightNavBarPicture /> }
    },
    HeartRateStats: {
      screen: HeartRateStats,
      navigationOptions: {
        title: "Resting heart rate",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    FloorsStats: {
      screen: FloorsStats,
      navigationOptions: {
        title: "Floors",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    DistanceStats: {
      screen: DistanceStats,
      navigationOptions: {
        title: "Distance",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    CaloriesBurnedStats: {
      screen: CaloriesBurnedStats,
      navigationOptions: {
        title: "Calories Burned",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    StepsStats: {
      screen: StepsStats,
      navigationOptions: {
        title: "Steps",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    //nutrients part
    ProteinsStats: {
      screen: ProteinsStats,
      navigationOptions: {
        title: "Proteins",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    CarbsStats: {
      screen: CarbsStats,
      navigationOptions: {
        title: "Carbs",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    FatsStats: {
      screen: FatsStats,
      navigationOptions: {
        title: "Fats",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    CaloriesStats: {
      screen: CaloriesStats,
      navigationOptions: {
        title: "Calories",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    Profile: {
      screen: Profile,

      navigationOptions: {
        headerRight: <HeaderRightNavBar />,
        title: "Profile"
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        headerStyle: {
          backgroundColor: colors.primary,
          marginTop: Platform.OS === "android" ? 0 : 20
        },
        headerTintStyle:"#ffffff",
        headerTitleStyle: {
          color: "white"
        },
        title: "EditProfile"
      }
    },
    CheckDoctor: {
      screen: CheckDoctor,
      navigationOptions: {
        title: "Assigned Doctor"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.primary,
        marginTop: Platform.OS === "android" ? 0 : 20
      },
      headerTintStyle:"#ffffff",
      headerTitleStyle: {
        color: "white"
      },
      title: "Stats"
    }),
    tabBarOptions: {
      activeTintColor: "#c73737",
      inactiveTintColor: "gray"
    }
  }
);

const ProfileNavigator = createStackNavigator(
  //Signed In Stack
  {
    Profile: {
      screen: Profile,
      navigationOptions: { headerRight: <HeaderRightNavBar /> }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        headerStyle: {
          backgroundColor: colors.primary,
          marginTop: Platform.OS === "android" ? 0 : 20
        },
        headerTintStyle:"#ffffff",
        headerTitleStyle: {
          color: "white"
        },
        title: "EditProfile"
      }
    },
    CheckDoctor: {
      screen: CheckDoctor,
      navigationOptions: {
        title: "Assigned Doctor"
      }
    }
  },
  {
    /*defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.primary,
        marginTop: Platform.OS === "android" ? 0 : 20
      },
      headerTitleStyle: {
        color: "white"
      },
      title: "Profile"
    }),*/
  }
);

const FoodLogsNavigator = createStackNavigator(
  //Signed In Stack
  {
    FoodLogs: {
      screen: FoodLogs,
      navigationOptions: { headerRight: <HeaderRightNavBarPicture /> }
    },
    Nutrients: {
      screen: Nutrients,
      navigationOptions: {
        title: "Nutrients",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    FoodLogRegister: {
      screen: FoodLogRegister,
      navigationOptions: {
        title: "New Food Log",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    FoodLogRegisterML: {
      screen: FoodLogRegisterML,
      navigationOptions: {
        title: "MyLife Food Detector",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    FoodLogRegisterBarcodeScanner: {
      screen: FoodLogRegisterBarcodeScanner,
      navigationOptions: {
        title: "MyLife Barcode Scanner",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    IngredientList: {
      screen: IngredientList,
      navigationOptions: {
        title: "Ingredients",
        headerRight: <HeaderRightNavBarPicture />
      }
    },
    MealRegister: {
      screen: MealRegister,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile,

      navigationOptions: {
        headerRight: <HeaderRightNavBar />,
        title: "Profile"
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        headerStyle: {
          backgroundColor: colors.primary,
          marginTop: Platform.OS === "android" ? 0 : 20
        },
        headerTitleStyle: {
          color: "white"
        },
        title: "EditProfile"
      }
    },
    CheckDoctor: {
      screen: CheckDoctor,
      navigationOptions: {
        title: "Assigned Doctor"
      }
    }
  },
  {
    initialRouteName: "FoodLogs",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.primary,
        tintColor: "#ffffff",
        marginTop: Platform.OS === "android" ? 0 : 20
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintStyle:"#ffffff",
      title: "Food Logs"
    })
  }
);

const AppNavigator = createBottomTabNavigator(
  //Signed In Stack
  {
    FoodLogs: {
      screen: FoodLogsNavigator,
      navigationOptions: {
        tabBarLabel: "Food Log",
        tabBarIcon: ({ tintColor }) => (
          <Foundation name="book" color={tintColor} size={25} />
        )
      }
    },

    AddFoodLog: {
      screen: FoodLogsNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => (
          <TouchableOpacity
            style={{
              height: 85,
              width: 85,
              borderRadius: 100,
              borderWidth: 2,
              elevation: 6, // Android
              borderColor: colors.gray,
              alignItems: "center",
              justifyContent:"center",
              backgroundColor: "white",
            }}
            onPress={() => NavigationService.navigate("FoodLogRegister")}
          >
            <AntDesign
              name="plus"
              size={40}
              color={colors.primary}
              style={{
                alignContent: "center"
              }}
            />
          </TouchableOpacity>
        )
      }
    },

    Stats: {
      screen: StatsNavigator,
      navigationOptions: {
        tabBarLabel: "Stats",
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
