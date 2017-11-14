import { WS_ACTION } from '../../game/constants/ws';
import { PLAYERS_REGISTER_PLAYER } from '../../game/constants/players';
import { ME_SET_INFO } from '../../src/js/constants/me';
import { GAME_START } from '../../game/constants/game';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../game/constants/move';
import DiscardMove from '../../game/components/DiscardMove';

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
                    case GAME_START:
                        this.game.start();
                        break;
                    case MOVE_DISCARD:
                        const discardMove = new DiscardMove(this.playerId, data.action.card);
                        this.game.receiveMove(discardMove);
                        break;
                    case MOVE_WRITE:
                        const writeMove = new WriteMove(this.playerId, data.action.code);
                        this.game.receiveMove(writeMove);
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
