import { TOGGLE_FAVORITE, SET_FILTERS } from "../../types";
import { MEALS } from "../../../data/dummy";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }
    case SET_FILTERS:
      const appliedFiltes = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFiltes.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFiltes.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFiltes.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFiltes.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: updatedFilteredMeals,
      };
    default:
      return state;
  }
};
