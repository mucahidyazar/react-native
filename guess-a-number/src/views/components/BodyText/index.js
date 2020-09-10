import React from "react";
import { StyleSheet, Text, View } from "react-native";

const index = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

export default index;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
