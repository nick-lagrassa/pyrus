import { 
    GAME_REGISTER_PLAYER,
    GAME_STATUS_INIT,
    GAME_START,
    GAME_STATUS_RUNNING
} from '../../constants/game';

const initialState = {
    status: GAME_STATUS_INIT,
    err: null
};

export default function game(state=initialState, action) {
    switch (action.type) {
        case GAME_REGISTER_PLAYER:
            if (state.status !== GAME_STATUS_INIT) {
                // error
            }
            break;
        case GAME_START:
            if (state.status !== GAME_STATUS_INIT) {
                // error
            }

            return {
                ...state,
                status: GAME_STATUS_RUNNING
            }
            break;
        default:
            return state;
    }
}
