import { WS_ACTION } from '../../game/constants/ws';
import { PLAYERS_REGISTER_PLAYER } from '../../game/constants/players';
import { ME_SET_INFO } from '../../src/js/constants/me';

export default class ServerStreamHandler {
    constructor(socket, game, playerId) {
        this.socket = socket;
        this.game = game;
        this.playerId = playerId;

        this.socket.addEventListener('message', message => {
            const data = JSON.parse(message.data);
            if (data.type === WS_ACTION) {
                switch(data.action.type) {
                    case PLAYERS_REGISTER_PLAYER:
                        if (this.game.registerPlayer(data.action.name, this.playerId)) {
                            this.sendAction({
                                type: ME_SET_INFO,
                                name: data.action.name,
                                id: this.playerId
                            });
                        };
                        break;
                    default:
                        break;
                }
            }
        })

        // remove player from state
        this.socket.addEventListener('close', () => {
            
        })

        // print error message
        this.socket.addEventListener('error', (err) => {
            console.log('ServerStreamHandler received error: %s', err);
        })

        this.socket.addEventListener('end', () => {
            this.socket.close();
        })
    }

    // Send message (action) into this.socket to be received on client side
    // obj ->
    sendAction(action) {
        this.socket.send(JSON.stringify({
            type: WS_ACTION,
            action
        }));
    }
}
