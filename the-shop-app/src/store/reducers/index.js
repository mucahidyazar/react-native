import { combineReducers } from "redux";
import MainReducer from "./main";
import ProductsReducer from "./products";
import CartReducer from "./cart";
import OrdersReducer from "./orders";

export default combineReducers({
  main: MainReducer,
  products: ProductsReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});
