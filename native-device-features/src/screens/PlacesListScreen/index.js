import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../views/components/HeaderButton";
import PlaceItem from "../../views/components/PlaceItem";
import { loadPlaces } from "../../store/actions/main";

const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.main.places);

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          onSelect={() => {
            navigation.navigate("PlaceDetail", {
              placeId: itemData.item.id,
              placeTitle: itemData.item.title,
            });
          }}
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            itemName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => navData.navigation.navigate("NewPlace")}
          />
        </HeaderButtons>
      );
    },
  };
};

export default PlacesListScreen;

const styles = StyleSheet.create({});
