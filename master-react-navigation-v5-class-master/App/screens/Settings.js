import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button
        title="To Actions"
        onPress={() =>
          navigation.navigate("Tabs", { screen: "Actions", params: { x: 5 } })
        }
      />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
