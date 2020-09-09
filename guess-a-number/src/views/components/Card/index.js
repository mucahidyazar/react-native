import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    //For IOS
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //For Android
    elevation: 8,
  },
});
