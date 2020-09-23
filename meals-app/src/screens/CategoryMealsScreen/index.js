import React from "react";
import { StyleSheet, Text, View, Button, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../../constants/colors";
import { CATEGORIES } from "../../data/dummy";
import { useSelector } from "react-redux";
import MealList from "../../views/components/MealList";
import DefaultText from "../../views/components/DefaultText";

const CategoryMealsScreen = ({ navigation }) => {
  const catId = navigation.getParam("categoryId");
  const availableMeals = useSelector((state) => state.main.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>
          No meals found, maybe you should check your filters
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
