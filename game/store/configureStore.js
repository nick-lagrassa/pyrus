import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import StreamBroadcaster from '../middleware/streambroadcaster';

export default (streams, initialState={}) => {
    const broadcaster = new StreamBroadcaster(streams);

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(broadcaster.broadcast())),
    );
};
