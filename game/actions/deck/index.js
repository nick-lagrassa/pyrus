import {
    DECK_POP,
    INITIALIZE_DECK
} from '../../constants/deck';

export const initializeDeck = cards => ({
    type: INITIALIZE_DECK,
    cards
});

export const pop = num => ({
    type: DECK_POP,
    num
});
