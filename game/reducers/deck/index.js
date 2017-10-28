import {
    DECK_POP,
    INITIALIZE_DECK
} from '../../constants/deck';

const initialState = {
    cards: []
};

export default function deck(state=initialState, action) {
    switch (action.type) {
        case INITIALIZE_DECK:
            return {
                ...state,
                cards: action.cards
            };
            break;
        case DECK_POP:
            return {
                ...state,
                cards: state.cards.slice(action.num)
            };
            break;
        default:
            return state;
    }
}
