import React, { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import colors from "../../../constants/colors";
import { ActivityIndicator } from "react-native-paper";
import MapPreview from "../MapPreview";

const LocationPicker = ({ onImageTaken, navigation, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  const mapPickedLocation = navigation.getParam("pickedLocation");

  useEffect(() => {
    setPickedLocation(mapPickedLocation);
    onLocationPicked(mapPickedLocation);
  }, [mapPickedLocation]);

  //Permissions.askAsync(Permissions.CAMERA); //Kameraya erisim icin
  //Permissions.askAsync(Permissions.CAMERA_ROLL); //Galeriye erisim icin
  //Permissions.askAsync(Permissions.LOCATION); //location erisim icin
  const verifyPermissions = async () => {
    const result = await Location.requestPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Text>No location choosen yet.</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={colors.primary}
          onPress={getLocationHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
