import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Button, Platform, SafeAreaView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { DrawerItems } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import colors from "../../constants/colors";

//!SCREENS
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../../screens/shop/OrdersScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen, {
  screenOptions as productOverviewScreenOptions,
} from "../../screens/shop/ProductsOverviewScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../../screens/user/EditProductScreen";
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from "../../screens/user/UserProductsScreen";
import AuthScreen, {
  screenOptions as authScrenOptions,
} from "../../screens/user/AuthScreen";
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

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: {
//       screen: ProductsOverviewScreen,
//     },
//     ProductDetail: {
//       screen: ProductDetailScreen,
//     },
//     Cart: {
//       screen: CartScreen,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === "android" ? colors.primary : "",
//       },
//       headerBackTitleStyle: {
//         fontFamily: "open-sans-bold",
//       },
//       headerBackTitleStyle: {
//         fontFamily: "open-sans",
//       },
//       headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
//     },
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     defaultNavigationOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name="UserProduct"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: {
//       screen: UserProductsScreen,
//     },
//     EditProduct: {
//       screen: EditProductScreen,
//     },
//   },
//   {
//     defaultNavigationOptions,
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-create" : "ios-create"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//   }
// );

const ShowDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShowDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
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
      }}
      drawerContentOptions={{ activeTintColor: colors.primary }}
    >
      <ShowDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={() => {
          return {
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
                color={props.color}
              />
            ),
          };
        }}
      />
      <ShowDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={() => {
          return {
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
              />
            ),
          };
        }}
      />
      <ShowDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={() => {
          return {
            drawerIcon: (props) => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={props.color}
              />
            ),
          };
        }}
      />
    </ShowDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: {
//       screen: ProductsNavigator,
//     },
//     Orders: {
//       screen: OrdersNavigator,
//     },
//     Admin: {
//       screen: AdminNavigator,
//     },
//   },
//   {
//     contentOptions: {
//       activeTintColor: colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={colors.primary}
//               onPress={() => {
//                 dispatch(logout());
//                 //props.navigation.navigate("Auth");
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScrenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: {
//       screen: AuthScreen,
//     },
//   },
//   {
//     defaultNavigationOptions,
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: {
//     screen: StartupScreen,
//   },
//   Auth: {
//     screen: AuthNavigator,
//   },
//   Shop: {
//     screen: ShopNavigator,
//   },
// });

//export default createAppContainer(MainNavigator);
