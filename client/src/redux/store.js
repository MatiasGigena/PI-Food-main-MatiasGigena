import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../redux/reducer";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
