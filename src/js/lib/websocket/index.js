import { WS_ACTION } from '../../../../game/constants/ws';

class ClientStreamHandler {
    constructor(socket, store) {
        this.socket = socket;
        this.store = store;

        this.socket.on('message', (data) => {
            const message = JSON.parse(data);
            if(message.type === WS_ACTION) {
                this.store.dispatch(message.action);    
            }
        }

        this.socket.on('close', () => {

        }

        this.socket.on('error', (err) => {
            console.log('ClientStreamHandler received error: %s', err);
        }
    }

    // Send messagne (action or code) into socket to be received on server side
    // obj ->
    sendToServer(message) {
        this.socket.send(JSON.stringify(message));
    }
}
