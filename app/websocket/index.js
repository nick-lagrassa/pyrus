class ServerStreamHandler {
    constructor(socket, gameId) {
        this.socket = socket;
        this.gameId = gameId;
        this.playerId = null;
        const stream = this;

        socket.on('setup', (data) => {
            this.playerId = JSON.parse(data).playerId;
        }

        // TODO restructure once run code, delete, comment, etc are added
        socket.on('message', (data) => {
            const parsed = JSON.parse(data);
            if(parsed.action) {
                this.game.receiveMove(action);
            }
            if(parsed.code) {
                this.game.receiveCode(parsed.code);
            }
        }

        // TODO handle removing stream correctly
        // remove player from state
        socket.on('close', () => {
            this.game.removePlayer(playerId);
            stream.push(null);
            socket.close();
        }

        // print error message
        socket.on('error', (err) => {
            console.log('ServerStreamHandler received error: %s', err);
        }

        // TODO is socket.close sufficient
        socket.on('end', () => {
            socket.close();
        }
    }

    // Send messagne (action) into socket to be received on client side
    // obj ->
    sendToClient(message) {
        socket.send(JSON.stringify(message);
    }

    get gameId() {
        return this.gameId;
    }

    set playerId(id) {
        this.playerId = id;
    }
}
