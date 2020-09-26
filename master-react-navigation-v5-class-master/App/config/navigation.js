import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//!NavigationContainer'i olusturmak icin
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from "@react-navigation/native";
//!StackNavigation'i olusturmak icin
import { createStackNavigator } from "@react-navigation/stack";
//!BottomTabsNavigation'i olusturmak icin
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//!DrawerNavigation'i olusturmak icin
import { createDrawerNavigator } from "@react-navigation/drawer";

import ContactsList from "../screens/ContactsList";
import ContactDetails from "../screens/ContactDetails";
import ActionsList from "../screens/ActionsList";
import ActionDetails from "../screens/ActionDetails";
import Settings from "../screens/Settings";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Loading from "../screens/Loading";
import Modal from "../screens/Modal";

const CreateNew = () => {
  return <View style={{ flex: 1, backgroundColor: "red" }}></View>;
};
const ContactsStack = createStackNavigator();
const ContactsStackScreen = () => {
  return (
    <ContactsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "red" }, //!Stack navigatorumuzun arka planini kirmizi yapar
      }}
    >
      <ContactsStack.Screen
        name="ContactsList"
        component={ContactsList}
        options={{
          headerTitle: "Contacts",
        }}
      />
      <ContactsStack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={({ navigation, route }) => {
          return {
            headerTitle: `${route.params.contact.name.first} ${route.params.contact.name.last}`,
            headerStyle: { backgroundColor: "green" },
          };
        }}
      />
    </ContactsStack.Navigator>
  );
};

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      >
        <Text>Open</Text>
        {/* <Image source={require('./assets/images/icons/drawer.png')} /> */}
      </TouchableOpacity>
    </View>
  );
};

const ActionsStack = createStackNavigator();
const ActionsStackScreen = () => {
  return (
    <ActionsStack.Navigator
      screenOptions={{
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <ActionsStack.Screen name="ActionsList" component={ActionsList} />
      <ActionsStack.Screen name="ActionDetails" component={ActionDetails} />
    </ActionsStack.Navigator>
  );
};

const CreateNewPlaceholdre = () => {
  return <View style={{ flex: 1, backgroundColor: "blue" }}></View>;
};

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => {
  return (
    <AppTabs.Navigator
      //!Default olarak tum tabbar'daki navigation menuler icin ayarlar buradan yapilir
      screenOptions={{
        //!Tum tabbarlara default isim atar
        tabBarLabel: "Test",
      }}
      tabBarOptions={{
        activeTintColor: "red", //!Active olan tabbar'in yazi ve icon rengi
        activeBackgroundColor: "blue", //!Active olan tabbar'in arkaplan rengi
      }}
      initialRouteName="Actions" //!Boylelikle AppTabs.Navigator asagidaki ilk screen Contacts yerine uygulama acildiginda bizi Actions screen'ine goturecek
    >
      <AppTabs.Screen
        name="Contacts"
        component={ContactsStackScreen}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: (props) => (
            //*props.focus ile tabbar in active olup olmadigini anlayarak ona gore degerler verebilirsiniz
            //*props.color ile active olan renkli olur
            <Ionicons
              name="ios-contacts"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Actions"
        component={ActionsStackScreen}
        options={{
          //!Tabbar iconunun altinda gozukecek isimi yazariz.
          //!Yazmazsak AppTabs.Navigator'deki tabBarLabel'da default olan yazi yazar. Eger oradada birsey yoksa burada name kisminda yazan TabBar name'leri yazar
          tabBarLabel: "Actions",
          tabBarIcon: (props) => (
            //*props.focus ile tabbar in active olup olmadigini anlayarak ona gore degerler verebilirsiniz
            //*props.color ile active olan renkli olur
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="Create"
        component={CreateNewPlaceholdre}
        options={{
          //!Tabbar iconunun altinda gozukecek isimi yazariz.
          //!Yazmazsak AppTabs.Navigator'deki tabBarLabel'da default olan yazi yazar. Eger oradada birsey yoksa burada name kisminda yazan TabBar name'leri yazar
          tabBarLabel: "Create",
          tabBarIcon: (props) => (
            //*props.focus ile tabbar in active olup olmadigini anlayarak ona gore degerler verebilirsiniz
            //*props.color ile active olan renkli olur
            <Ionicons name="ios-add" size={props.size} color={props.color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("CreateNew");
          },
        })}
      />
    </AppTabs.Navigator>
  );
};

const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        drawerLabel: "Drawer",
      }}
      drawerType="slide"
      drawerPosition="right"
    >
      <AppDrawer.Screen
        name="Tabs"
        component={AppTabsScreen}
        options={{
          gestureEnabled: true, //!Saga dokunarak surukleyerek drawer navigation'un acilmasini saglar
          drawerLabel: "App", //!Drawer'da gosterilecek tab navigation'un ismini text'ini belirler
        }}
      />
      <AppDrawer.Screen
        name="Settings"
        component={Settings}
        options={{
          gestureEnabled: false, //!Saga dokunarak surukleyerek drawer navigation'un acilmasina izin vermez
          drawerLabel: "Settings", //!Drawer'da gosterilecek tab navigation'un ismini text'ini belirler
        }}
      />
    </AppDrawer.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setUser({});
    }, 500);
  }, []);

  return (
    <RootStack.Navigator
      headerMode="none" //!Yukarida ki StackNavigator'da bunun altina gelecegi icin 2 tane stack navigator olacak bu yuzden burada olusacak StackNavigator'un yukarida gozuken stack kismini none yaparak yokediyoruz.
      screenOptions={{ animationEnabled: false }} //!Gecis animasyonu olsunmu olmasinmi
      mode="modal" //!Bu stack navigation'un bir Global Modal screen oldugunu soyleriz
    >
      {isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : user ? (
        <RootStack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
      ) : (
        <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
      <RootStack.Screen
        name="CreateNew"
        component={CreateNew}
        options={{
          animationEnabled: true, //! Bu stack screen acilirken sayfa yukari dogru kayarak acilan bir animasyon ekler
          cardStyle: {
            backgroundColor: "rgba(0,0,0,0.15)",
          },
        }}
      />
      <RootStack.Screen
        name="Modal"
        component={Modal}
        options={{
          animationEnabled: true, //! Bu stack screen acilirken sayfa yukari dogru kayarak acilan bir animasyon ekler
          cardStyle: {
            backgroundColor: "rgba(0,0,0,0.15)",
          },
        }}
      />
      <RootStack.Screen
        name="Alert"
        component={Modal}
        options={{
          animationEnabled: true, //! Bu stack screen acilirken sayfa yukari dogru kayarak acilan bir animasyon ekler
          cardStyle: {
            backgroundColor: "rgba(0,0,0,0.15)",
          },
          cardOverlayEnabled: true, //!Diger cardlarin overlay olur yani ustune cikar
          //!FADEIN EFEKTI
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                //!FADE IN efekti verir modal'imize
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                //!FADE IN efekti verir modal'imizin Overlay'ine
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: "clamp",
                }),
              },
            };
          },
        }}
      />
    </RootStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
