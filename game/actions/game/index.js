import {
    GAME_START,
    GAME_SPEND_PLAYER_ACTION
} from '../../constants/game';

export const gameStart = () => ({
    type: GAME_START
});

export const spendPlayerAction = () => ({
    type: GAME_SPEND_PLAYER_ACTION
});
