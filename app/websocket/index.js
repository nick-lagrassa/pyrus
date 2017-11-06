import { WS_ACTION } from '../game/constants/ws';
import { PLAYERS_REGISTER_PLAYER } from '../game/constants/players';

class ServerStreamHandler {
    constructor(socket, game, playerId) {
        this.socket = socket;
        this.game = game;
        this.playerId = playerId;
        const stream = this;

        this.socket.on('message', (data) => {
            const message = JSON.parse(data);
            if(message.type === WS_ACTION) {
                switch(message.action.type) {
                    case PLAYERS_REGISTER_PLAYER:
                        this.game.registerPlayer(message.action.name, this.playerId);
                        break;
                    default:
                        break;
                }
            }
        }

        // remove player from state
        this.socket.on('close', () => {
            stream.push(null);
            this.socket.close();
        }

        // print error message
        this.socket.on('error', (err) => {
            console.log('ServerStreamHandler received error: %s', err);
        }

        this.socket.on('end', () => {
            this.socket.close();
        }
    }

    // Send message (action) into this.socket to be received on client side
    // obj ->
    sendToClient(message) {
        this.socket.send(JSON.stringify(message));
    }
}
