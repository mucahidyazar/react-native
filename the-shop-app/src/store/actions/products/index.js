import axios from "axios";
import { guidGenerator } from "../../../helper/randomId";
import Product from "../../../models/product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../../types";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      // any async code you want
      const { data } = await axios.get(
        "https://the-shop-app-c0a9a.firebaseio.com/products.json"
      );
      const loadedProducts = [];
      for (const key in data) {
        loadedProducts.push(
          new Product(
            key,
            data[key].ownerId,
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (error) {
      // you can send custom dispatch for error
      throw error;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await axios.delete(
      `https://the-shop-app-c0a9a.firebaseio.com/products/${productId}.json`
    );
    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  //!reduxt-thunk getState ile bize tum reducerslari dondurur
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // any async code you want
    const { data } = await axios.post(
      `https://the-shop-app-c0a9a.firebaseio.com/products.json?auth=${token}`,
      {
        id: guidGenerator(),
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      }
    );
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: data.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  //!reduxt-thunk getState ile bize tum reducerslari dondurur
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const {
      data,
    } = await axios.patch(
      `https://the-shop-app-c0a9a.firebaseio.com/products/${id}.json?auth=${token}`,
      { title, description, imageUrl }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
