import {
    GAME_STATUS_INIT,
    GAME_START,
    GAME_END,
    GAME_STATUS_RUNNING,
    GAME_STATUS_END,
    GAME_SPEND_MOVE,
    GAME_CYCLE_TO_NEXT_PLAYER
} from '../../constants/game';
import settings from '../../config/settings'

const initialState = {
    status: GAME_STATUS_INIT,
    turnCount: 0,
    numMovesRemaining: settings.NUM_PLAYER_MOVES_PER_TURN,
    err: null
};

export default function game(state=initialState, action) {
    switch (action.type) {
        case GAME_START:
            return {
                ...state,
                status: GAME_STATUS_RUNNING
            };
        case GAME_SPEND_MOVE:
            return {
                ...state,
                numMovesRemaining: state.numMovesRemaining - 1
            };
        case GAME_CYCLE_TO_NEXT_PLAYER:
            return {
                ...state,
                turnCount: state.turnCount + 1,
                numMovesRemaining: settings.NUM_PLAYER_MOVES_PER_TURN
            };
        case GAME_END:
            return {
                ...state,
                status: GAME_STATUS_END
            }
        default:
            return state;
    }
}
