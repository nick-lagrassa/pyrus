import {
    GAME_START,
    GAME_SPEND_PLAYER_MOVE
} from '../../constants/game';

export const gameStart = () => ({
    type: GAME_START
});

export const spendPlayerMove = () => ({
    type: GAME_SPEND_PLAYER_MOVE
});
