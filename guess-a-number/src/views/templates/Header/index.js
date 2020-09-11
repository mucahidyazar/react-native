import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import colors from "../../../constants/colors";
import TitleText from "../../components/TitleText";

function Header({ title }) {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },
  title: {
    color: Platform.OS === "ios" ? colors.primary : "white",
  },
});

export default Header;
