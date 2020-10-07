import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { mapApi } from "../../../../config/env";

const MapPreview = ({ children, style, location, onPress }) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.lat},${location.lng}&key=${mapApi}`;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.mapPreview, ...style }}
    >
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
