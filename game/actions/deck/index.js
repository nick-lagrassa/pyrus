import {
    DECK_POP,
} from '../../constants/deck';

export const pop = num => ({
    type: DECK_POP,
    num
});
