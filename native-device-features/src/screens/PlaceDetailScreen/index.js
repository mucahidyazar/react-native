import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";
import MapPreview from "../../views/components/MapPreview";

const PlaceDetailScreen = ({ navigation }) => {
  const placeId = navigation.getParam("placeId");
  const selectedPlace = useSelector((state) =>
    state.main.places.find((place) => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showPressHandler = () => {
    navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showPressHandler}
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  const placeTitle = navData.navigation.getParam("placeTitle");
  return {
    headerTitle: placeTitle,
  };
};

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
