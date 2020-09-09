import React from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

function GoalInput({
  isAddMode,
  addGoalHandler,
  enteredGoal,
  enteredGoalHandler,
  cancelGoalHandler,
}) {
  return (
    <Modal
      style={styles.modalContainer}
      visible={isAddMode}
      animationType="slide"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a number"
          style={styles.inputContainerText}
          onChangeText={enteredGoalHandler}
          value={enteredGoal}
        />
        <View style={styles.inputContainerButtons}>
          <View style={styles.inputContainerButton}>
            <Button title="Cancel" color="red" onPress={cancelGoalHandler} />
          </View>
          <View style={styles.inputContainerButton}>
            <Button title="Add" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    marginLeft: "5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerText: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  inputContainerButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainerButton: {
    width: "40%",
  },
});

export default GoalInput;
