import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { SIGN_UP, SIGN_IN, AUTHENTICATE, LOGOUT } from "../../types";

let timer;

export const authenticate = (userId, token, expirtTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirtTime));
    dispatch({
      type: AUTHENTICATE,
      userId,
      token,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwZnEwFVXyjdmlrcCh_CN0H7WzQ5tWhAQ`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    dispatch(
      authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwZnEwFVXyjdmlrcCh_CN0H7WzQ5tWhAQ`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    dispatch(
      authenticate(data.localId, data.idToken, parseInt(data.expiresIn) * 1000)
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn) * 1000
    );
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(), //Istedigimiz formatta stringe ceviriyor
    })
  );
};
