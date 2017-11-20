import {
    DECK_POP,
    DECK_INITIALIZE,
    DECK_SHUFFLE
} from '../../constants/deck';

export const initializeDeck = cards => ({
    type: DECK_INITIALIZE,
    cards
});

export const pop = num => ({
    type: DECK_POP,
    num
});

export const shuffleDeck = () => ({
    type: DECK_SHUFFLE
});
