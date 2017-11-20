import {
    GAME_START,
    GAME_END,
    GAME_SPEND_MOVE,
    GAME_CYCLE_TO_NEXT_PLAYER,
    GAME_RESET
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

export const gameReset = () => ({
    type: GAME_RESET
});
