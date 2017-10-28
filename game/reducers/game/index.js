import { 
    GAME_REGISTER_PLAYER,
    GAME_STATUS_INIT,
    GAME_START,
    GAME_STATUS_RUNNING,
    GAME_SPEND_PLAYER_MOVE
} from '../../constants/game';
import {
    NUM_PLAYER_MOVES_PER_TURN
} from '../../config/settings'

const initialState = {
    status: GAME_STATUS_INIT,
    numPlayers: 0,
    activePlayerIndex: 0,
    numMovessRemaining: NUM_PLAYER_MOVES_PER_TURN,
    err: null
};

export default function game(state=initialState, action) {
    switch (action.type) {
        case GAME_START:
            return {
                ...state,
                status: GAME_STATUS_RUNNING
            };
            break;
        case GAME_SPEND_PLAYER_MOVE:
            if (state.numMovesRemaining > 1) {
                return {
                    ...state,
                    numMovesRemaining: state.numMovesRemaining - 1
                };
            } else {
                return {
                    ...state,
                    activePlayerIndex: (state.activePlayerIndex + 1) % state.numPlayers,
                    numMovesRemaining: NUM_PLAYER_MOVES_PER_TURN
                };
            }
            break;
        default:
            return state;
    }
}
