import { combineReducers } from "redux";
import MainReducer from "./main";

export default combineReducers({
  main: MainReducer,
});
