import { WS_ACTION, WS_COMMAND } from '../../app/constants/ws';
import { COMMAND_RUN_CODE } from '../../app/constants/command';
import { PLAYERS_REGISTER_PLAYER } from '../../game/constants/players';
import { ME_SET_INFO } from '../../src/js/constants/me';
import { GAME_START } from '../../game/constants/game';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../game/constants/move';
import DiscardMove from '../../game/components/DiscardMove';
import WriteMove from '../../game/components/WriteMove';
import safeEval from '../../game/util/safeEval';

const bracketsRe = /^\[|\]$/g;

export default class ServerStreamHandler {
    constructor(socket, game, playerId, logger) {
        this.socket = socket;
        this.game = game;
        this.playerId = playerId;
        this.logger = logger;

        this.socket.addEventListener('message', message => {
            const data = JSON.parse(message.data);
            this.logger.log({
                sender: 'CLIENT',
                playerId: this.playerId,
                // should we also log the player's name?
                data
            });
            switch (data.type) {
                case WS_ACTION:
                    this.handleWSAction(data.action);
                    break;
                case WS_COMMAND:
                    this.handleWSCommand(data.command);
                    break;
            }
        });

        // remove player from state
        this.socket.addEventListener('close', () => {

        });

        // print error message
        this.socket.addEventListener('error', err => {
            console.log('ServerStreamHandler received error: %s', err);
        });

        this.socket.addEventListener('end', () => {

        });
    }

    // Send message (action) into this.socket to be received on client side
    // obj ->
    sendAction(action) {
        const data = JSON.stringify({
            type: WS_ACTION,
            action
        });
        this.logger.log({
            sender: 'SERVER',
            playerId: this.playerId,
            data
        })
        this.socket.send(data);
    }

    handleWSAction(action) {
        switch (action.type) {
            case PLAYERS_REGISTER_PLAYER:
                if (this.game.registerPlayer(action.name, this.playerId)) {
                    this.sendAction({
                        type: ME_SET_INFO,
                        name: action.name,
                        id: this.playerId
                    });
                };
                break;
            case GAME_START:
                this.game.start();
                break;
            case MOVE_DISCARD:
            case MOVE_WRITE:
            case MOVE_CONSUME:
                this.game.receiveMove(action.move);
                break;
            default:
                break;
        }
    }

    handleWSCommand(command) {
        switch (command.type) {
            case COMMAND_RUN_CODE:
                let results = [];
                for (let i = 0; i < command.tests.length; i++) {
                    const test = command.tests[i];
                    const code = `${ command.fn }(${ JSON.stringify(test.input).replace(bracketsRe, '') })`;
                    // this is likely a very bad way to do this, since i believe (? not 100% sure)
                    // that safeEval is synchronous, so in the worst case (i.e. all tests timeout),
                    // we could leave the user waiting for a few seconds before the tests return
                    // and possibly our backend could miss some stuff if since it's blocking the
                    // thread of execution? idk im not sure but in any case it sounds like trouble
                    const result = safeEval(code);

                    if (result instanceof Error) {
                        results.push({
                            passed: false,
                            input: test.input,
                            // TODO: make error'd test case outputs not hardcoded
                            output: "Error: test timed out",
                            expected: test.expected
                        });
                    } else {
                        results.push({
                            // TODO: implement custom checks for equality
                            passed: result === test.expected,
                            input: test.input,
                            output: result,
                            expected: test.expected
                        });
                    }
                }

                this.game.testResults = results;
                break;
            default:
                break;
        }
    }
}
