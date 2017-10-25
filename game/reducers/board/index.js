import {
    GAME_REGISTER_PLAYER
} from '../../constants/game';
import settings from '../../config/settings';

const initialState = {
    players: []
};

export default function board(state=initialState, action) {
    switch (action.type) {
        case GAME_REGISTER_PLAYER:
            if (state.players.length >= settings.MAX_PLAYERS_PER_GAME) {
                return {
                    ...state
                };
            } else {
                return {
                    ...state,
                    players: [
                        ...state.players,
                        action.newPlayer
                    ]
                };
            }
            break;
        default:
            return state;
            break;
    }
}
