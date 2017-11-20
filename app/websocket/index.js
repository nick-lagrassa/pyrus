import { WS_ACTION } from '../../game/constants/ws';
import { PLAYERS_REGISTER_PLAYER } from '../../game/constants/players';
import { ME_SET_INFO } from '../../src/js/constants/me';
import { GAME_START, GAME_END_TURN } from '../../game/constants/game';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../game/constants/move';
import DiscardMove from '../../game/components/DiscardMove';
import WriteMove from '../../game/components/WriteMove';

export default class ServerStreamHandler {
    constructor(socket, game, playerId, logger) {
        this.socket = socket;
        this.game = game;
        this.playerId = playerId;
        this.logger = logger;

        this.socket.addEventListener('message', message => {
            const data = JSON.parse(message.data);
            this.logger.log(data);
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
                    case GAME_END_TURN:
                        if (this.playerId === this.game.activePlayer.id) {
                            this.game.endTurn();
                        }
                        break;
                    case MOVE_DISCARD:
                    case MOVE_WRITE:
                    case MOVE_CONSUME:
                        this.game.receiveMove(data.action.move);
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
