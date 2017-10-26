import {
    PLAYER_SET_HAND
} from '../../constants/player';

const initialState = {
    hand: []
};

export default function player(state=initialState, action) {
    switch (action.type) {
        case PLAYER_SET_HAND:
            return {
                ...state,
                hand: action.hand
            }
            break;
        default:
            return state;
    }
}
