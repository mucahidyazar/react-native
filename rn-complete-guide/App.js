import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  ScrollView,
} from "react-native";
import GoalItem from "./src/views/components/GoalItem/index";
import GoalInput from "./src/views/components/GoalInput/index";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const enteredGoalHandler = (value) => {
    setEnteredGoal(value);
  };

  const addGoalHandler = () => {
    if (enteredGoal !== "") {
      setCourseGoals((prev) => [
        ...prev,
        { id: Math.random().toString(), value: enteredGoal },
      ]);
      setEnteredGoal("");
      setIsAddMode(false);
    }
  };

  const cancelGoalHandler = () => {
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((prev) => {
      return prev.filter((item) => item.id !== goalId);
    });
  };

  const clearGoalsHandler = () => {
    setCourseGoals([]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        isAddMode={isAddMode}
        addGoalHandler={addGoalHandler}
        enteredGoal={enteredGoal}
        enteredGoalHandler={enteredGoalHandler}
        cancelGoalHandler={cancelGoalHandler}
      />
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            title={itemData.item.value}
            onDelete={removeGoalHandler}
          />
        )}
      />
      {courseGoals.length ? (
        <View style={styles.clearList}>
          <Button title="Clear" onPress={clearGoalsHandler} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 50,
    margin: 0,
    backgroundColor: "red",
    height: "100%",
  },
  list: {
    flex: 1,
  },
  clearList: {
    width: "100%",
  },
});
