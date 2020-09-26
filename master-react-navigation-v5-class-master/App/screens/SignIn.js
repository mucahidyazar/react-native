import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SignIn = ({ navigation }) => {
  return (
    <View>
      <Button title="Sign In" onPress={() => alert("togo!")} />
      <Button title="Sign Up" onPress={() => navigation.push("SignUp")} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
