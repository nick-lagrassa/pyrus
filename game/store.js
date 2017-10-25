import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ValidParenthesesGame } from '../lib/games/';

const initialState = { ValidParenthesesGame };
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
);

export default store;
