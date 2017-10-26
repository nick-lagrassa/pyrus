import {
    PLAYERS_REGISTER_PLAYER,
    PLAYERS_SET_PLAYER_HAND,
    PLAYERS_SET_PLAYER_NAME
} from '../../constants/player';

const initialState = {
    players: {},
    numPlayers   
};

export default function player(state=initialState, action) {
    switch (action.type) {
        case PLAYERS_REGISTER_PLAYER: 
            return {
                ...state,
                [action.id]: {
                    name: action.name
                },
                numPlayers: state.numPlayers + 1
            }
            break;
        case PLAYERS_SET_PLAYER_HAND:
            return {
                ...state,
                hand: action.hand
            }
            break;
        case PLAYERS_SET_PLAYER_NAME: 
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
