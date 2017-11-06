import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (gameId, streams, initialState={}) => (
    createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk.withExtraArgument(streams))),
    )
);
