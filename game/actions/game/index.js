import {
    GAME_START,
    GAME_END,
    GAME_SPEND_MOVE,
    GAME_CYCLE_TO_NEXT_PLAYER
} from '../../constants/game';

export const gameStart = () => ({
    type: GAME_START
});

export const spendMove = () => ({
    type: GAME_SPEND_MOVE
});

export const cycleToNextPlayer = () => ({
    type: GAME_CYCLE_TO_NEXT_PLAYER
});

export const gameEnd = () => ({
    type: GAME_END
});
