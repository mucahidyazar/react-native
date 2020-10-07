import React from "react";
import { Button, Platform, SafeAreaView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import colors from "../../constants/colors";

//!SCREENS
import CartScreen from "../../screens/shop/CartScreen";
import OrdersScreen from "../../screens/shop/OrdersScreen";
import ProductDetailScreen from "../../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../../screens/shop/ProductsOverviewScreen";
import EditProductScreen from "../../screens/user/EditProductScreen";
import UserProductsScreen from "../../screens/user/UserProductsScreen";
import AuthScreen from "../../screens/user/AuthScreen";
import StartupScreen from "../../screens/StartupScreen";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
    },
    ProductDetail: {
      screen: ProductDetailScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductsScreen,
    },
    EditProduct: {
      screen: EditProductScreen,
    },
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrdersNavigator,
    },
    Admin: {
      screen: AdminNavigator,
    },
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={colors.primary}
              onPress={() => {
                dispatch(logout());
                //props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    defaultNavigationOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: {
    screen: StartupScreen,
  },
  Auth: {
    screen: AuthNavigator,
  },
  Shop: {
    screen: ShopNavigator,
  },
});

export default createAppContainer(MainNavigator);

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: {
//       screen: CategoriesScreen,
//       navigationOptions: {
//         headerTitle: "Meal Categories",
//       },
//     },
//     CategoryMeals: {
//       screen: CategoryMealsScreen,
//       // navigationOptions: {
//       //   headerStyle: {
//       //     backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
//       //   },
//       //   headerTintColor:
//       //     Platform.OS === "android" ? "white" : colors.primaryColor,
//       // },
//     },
//     MealDetail: {
//       screen: MealDetailScreen,
//     },
//   },
//   {
//     initialRouteName: "Categories",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
//       },
//       headerTitleStyle: {},
//       headerBackTitleStyle: {
//         fontFamily: "open-sans",
//       },
//       headerTintColor:
//         Platform.OS === "android" ? "white" : colors.primaryColor,
//     },
//   }
// );

// const FavNavigator = createStackNavigator(
//   {
//     Favorites: FavoritesScreen,
//     MealDetail: MealDetailScreen,
//   },
//   {
//     //initialRouteName: "Categories",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
//       },
//       headerTitleStyle: {},
//       headerBackTitleStyle: {
//         fontFamily: "open-sans",
//       },
//       headerTintColor:
//         Platform.OS === "android" ? "white" : colors.primaryColor,
//     },
//   }
// );

// const tabScreenConfig = {
//   Meals: {
//     screen: MealsNavigator,
//     navigationOptions: {
//       tabBarLabel: "Meals",
//       tabBarIcon: (tabInfo) => {
//         return (
//           <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: colors.accentColor,
//       tabBarLabel:
//         Platform.OS === "android" ? (
//           <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
//         ) : (
//           "Meals"
//         ),
//     },
//   },
//   Favorites: {
//     screen: FavNavigator,
//     navigationOptions: {
//       tabBarLabel: "Favorites",
//       tabBarIcon: (tabInfo) => {
//         return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
//       },
//       tabBarColor: colors.primaryColor,
//       tabBarLabel:
//         Platform.OS === "android" ? (
//           <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
//         ) : (
//           "Meals"
//         ),
//     },
//   },
// };

// const MealsFavTabNavigator =
//   Platform.OS === "android"
//     ? createMaterialBottomTabNavigator(tabScreenConfig, {
//         activeColor: "white",
//         shifting: true,
//         barStyle: {
//           backgroundColor: colors.primaryColor,
//         },
//       })
//     : createBottomTabNavigator(tabScreenConfig, {
//         tabBarOptions: {
//           labelStyle: {
//             fontFamily: "open-sans",
//           },
//           activeTintColor: colors.accentColor,
//         },
//       });

// const FiltersNavigator = createStackNavigator(
//   {
//     Filters: FiltersScreen,
//   },
//   {
//     //initialRouteName: "Categories",
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
//       },
//       headerTitleStyle: {},
//       headerBackTitleStyle: {
//         fontFamily: "open-sans",
//       },
//       headerTintColor:
//         Platform.OS === "android" ? "white" : colors.primaryColor,
//     },
//   }
// );

// const MainNavigator = createDrawerNavigator(
//   {
//     MealsFavs: {
//       screen: MealsFavTabNavigator,
//       navigationOptions: () => {
//         return {
//           drawerLabel: "Meals",
//         };
//       },
//     },
//     Filters: {
//       screen: FiltersNavigator,
//     },
//   },
//   {
//     contentOptions: {
//       activeTintColor: colors.accentColor,
//       labelStyle: {
//         fontFamily: "open-sans",
//       },
//     },
//   }
// );
