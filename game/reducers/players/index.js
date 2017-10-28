import {
    PLAYERS_REGISTER_PLAYER,
    PLAYERS_SET_PLAYER_HAND,
} from '../../constants/players';

const initialState = [];

export default function player(state=initialState, action) {
    switch (action.type) {
        case PLAYERS_REGISTER_PLAYER:
            return [
                ...state,
                action.player
            ];
            break;
        case PLAYERS_SET_PLAYER_HAND:
            const newState = [...state];

            for (let i = 0; i < newState.length; i++) {
                const player = newState[i];
                if (player.id === action.id) {
                    newState[i] = {
                        ...newState[i],
                        hand: action.hand
                    };
                }
            }

            return newState;
            break;
        default:
            return state;
    }
}
