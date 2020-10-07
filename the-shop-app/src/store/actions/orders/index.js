import axios from "axios";
import { guidGenerator } from "../../../helper/randomId";
import Order from "../../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../../types";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      // any async code you want
      const { data } = await axios.get(
        `https://the-shop-app-c0a9a.firebaseio.com/orders/${userId}.json`
      );
      const loadedOrders = [];
      for (const key in data) {
        loadedOrders.push(
          new Order(
            key,
            data[key].cartItems,
            data[key].totalAmount,
            new Date(data[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      // you can send custom dispatch for error
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  //!reduxt-thunk getState ile bize tum reducerslari dondurur
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // any async code you want
    const date = new Date();
    const id = guidGenerator();
    const { data } = await axios.post(
      `https://the-shop-app-c0a9a.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        id,
        cartItems,
        totalAmount,
        date: date.toString(),
      }
    );
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
