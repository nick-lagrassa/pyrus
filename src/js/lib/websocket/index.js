class ClientStreamHandler {
    constructor(socket, playerId, store) {
        this.socket = socket;
        this.store = store;
        socket.emit('setup', { playerId });

        socket.on('message', (data) => {
            const parsed = JSON.parse(data);
            const action = parsed.action || null;

            if(action) {
                this.store.dispatch(action);
            }
            else {
                console.log('ClientStreamHandler did not receive action, instead received: %s', parsed);
            }
        }

        socket.on('close', () => {

        }

        socket.on('error', (err) => {
            console.log('ClientStreamHandler received error: %s', err);
        }
    }

    // Send messagne (action or code) into socket to be received on server side
    // obj ->
    sendToServer(message) {
        socket.send(JSON.stringify(message);
    }
}
