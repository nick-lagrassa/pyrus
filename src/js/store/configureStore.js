import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../game/reducers';

export default (initialState={}) => (
    createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk))
    )
);