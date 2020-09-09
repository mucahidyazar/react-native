import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function GoalItem({ id, title, onDelete }) {
  return (
    <TouchableOpacity onPress={() => onDelete(id)} activeOpacity={0.8}>
      <View style={styles.listItem}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default GoalItem;
