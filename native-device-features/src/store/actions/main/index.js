import * as FileSystem from "expo-file-system";
import { mapApi } from "../../../../config/env";
import { fetchPlaces, insertPlace } from "../../../../helpers/db";
import { ADD_PLACE, SET_PLACES } from "../../types";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${mapApi}`
      );
      if (!response.ok) {
        throw new Error("Somethings went wrong!");
      }
      const resData = await response.json();
      if (!resData.results) {
        throw new Error("Somethings went wrong!");
      }
      const address = resData.results[0].formatted_address;

      //Burada image ile gelen cache dosyalarini aliyoruz to ilede yeni yolumuza gonderiyoruz
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
