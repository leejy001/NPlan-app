import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ReduxThunk from "redux-thunk";
import Reducer from "./redux/reducers";
import "bootstrap/dist/css/bootstrap.min.css";

const createStorewithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

export const store = createStorewithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistore = persistStore(store)

ReactDOM.render(
  <Provider
    store={store}
  >
    <PersistGate persistor={persistore} >
    <Router>
      <App />
    </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
