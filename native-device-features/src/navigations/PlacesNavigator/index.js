import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import MapScreen from "../../screens/MapScreen";
import NewPlaceScreen from "../../screens/NewPlaceScreen";
import PlaceDetailScreen from "../../screens/PlaceDetailScreen";
import PlacesListScreen from "../../screens/PlacesListScreen";
import { color } from "react-native-reanimated";

const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
    },
    NewPlace: {
      screen: NewPlaceScreen,
    },
    Map: {
      screen: MapScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
    },
  }
);

export default createAppContainer(PlacesNavigator);
