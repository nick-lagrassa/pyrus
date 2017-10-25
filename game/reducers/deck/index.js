import {
    GAME_START
} from '../../constants/game';

const initialState = {
    deck: []
}

export default function deck(state=initialState, action) {
    switch (action.type) {
        case GAME_START:
            
            break;
        default:
            return state;
    }
}
