class WriteStreamHandler {
    constructor(socket, id) {
        this.socket = socket;
        this.gameId = id;
        this.playerId = null;

        socket.on('setup', (data) => {
            this.playerId = data;
        }

        // when receives a message it is checked for code, if code then update
        // board -> live editor
        // if action the act differently
        socket.on('message', (data) => {

        }

        //
        socket.on('close', () => {

        }

        // print error message
        socket.on('error', (err) => {
            console.log('WebStreamHandler received error: %s': err);
        }

        socket.on('end', () => {

        }
    }

    get gameId() {
        return this.gameId;
    }

    set playerId(id) {
        this.playerId = id;
    }
}
