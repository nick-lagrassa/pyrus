import settings from '../config/settings';
import { WS_ACTION } from '../../../game/constants/ws';

export default class ClientStreamHandler {
    constructor(store, gameId) {
        this.store = store;
        this.gameId = gameId;
        this.socket = new WebSocket(`${ settings.WS_APP_BACKEND }/${ this.gameId }`);

        this.socket.addEventListener('message', message => {
            const data = JSON.parse(message.data);
            if (data.type === WS_ACTION) {
                this.store.dispatch(data.action);
            }
        });

        this.socket.addEventListener('close', () => {

        });

        this.socket.addEventListener('error', (err) => {
            console.log('ClientStreamHandler received error: %s', err);
        });
    }

    // Send message (action or code) into socket to be received on server side
    // obj ->
    sendAction = action => {
        this.socket.send(JSON.stringify({
            type: WS_ACTION,
            action
        }));
    }
}
