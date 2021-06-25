import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./userReducer";
import plan from "./planReducer";

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["plan"],
};

const rootReducer = combineReducers({
  user,
  plan,
});

export default persistReducer(persistConfig,rootReducer);
