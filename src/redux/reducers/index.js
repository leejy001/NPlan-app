import { combineReducers } from "redux";
import user from "./userReducer";
import plan from "./planReducer";

const rootReducer = combineReducers({
  user,
  plan,
});

export default rootReducer;
