import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../../views/components/DefaultText";
import HeaderButton from "../../views/components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../store/actions";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam("mealId");
  const availableMeals = useSelector((state) => state.main.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  const currentMealIsFavorite = useSelector((state) =>
    state.main.favoriteMeals.some((meal) => meal.id === mealId)
  );
  //!Bunun yerine MealList componentinde setParams olarak ayarladik
  //*Cunku bununla olunca her komponent acildiginda useEfect'i bekliyor navigationOptions'daki getParam fakat MealList'ten gelince bekleme yapmaz.
  useEffect(() => {
    navigation.setParams({
      isFav: currentMealIsFavorite,
    });
  }, [currentMealIsFavorite]);

  //!Bunun yerine MealList componentinde setParams olarak ayarladik
  //*Cunku bununla olunca her komponent acildiginda useEfect'i bekliyor navigationOptions'daki getParam fakat MealList'ten gelince bekleme yapmaz.
  useEffect(() => {
    navigation.setParams({
      mealTitle: selectedMeal.title,
    });
  }, [selectedMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
      <View style={styles.screen}>
        <Text>{selectedMeal.title}</Text>
        <Button
          title="Go Back the categories"
          onPress={() => {
            navigation.popToTop();
          }}
        />
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName={isFavorite ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavorite}
          />
        </HeaderButtons>
      );
    },
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
