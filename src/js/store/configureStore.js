import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

export default (initialState = {}) => createStore(rootReducer, initialState);
