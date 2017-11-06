import settings from '../config/settings';
import { WS_ACTION } from '../../../game/constants/ws';

export default class ClientStreamHandler {
    constructor(socket, store) {
        this.socket = socket;
        this.store = store;

        this.socket.addEventListener('message', (data) => {
            const message = JSON.parse(data);
            if(message.type === WS_ACTION) {
                this.store.dispatch(message.action);    
            }
        });

        this.socket.addEventListener('close', () => {

        });

        this.socket.addEventListener('error', (err) => {
            console.log('ClientStreamHandler received error: %s', err);
        });
    }

    // Send messagne (action or code) into socket to be received on server side
    // obj ->
    sendToServer(message) {
        this.socket.send(JSON.stringify(message));
    }
}

export const startSocket = async () => {
    return new Promise(resolve => {
        const ws = new WebSocket(`${ settings.WS_APP_BACKEND }`);
        ws.addEventListener('connection', (socket) => { resolve(socket) });
    });
}
