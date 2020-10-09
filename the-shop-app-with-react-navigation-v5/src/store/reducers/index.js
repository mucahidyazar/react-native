import { combineReducers } from "redux";
import MainReducer from "./main";
import AuthReducer from "./auth";
import ProductsReducer from "./products";
import CartReducer from "./cart";
import OrdersReducer from "./orders";

export default combineReducers({
  auth: AuthReducer,
  main: MainReducer,
  products: ProductsReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});
