import {
    GAME_REGISTER_PLAYER,
    GAME_START
} from '../constants/game';

export const registerPlayer = newPlayer => (
    dispatch => ({
        type: GAME_REGISTER_PLAYER,
        player: {
            id: newPlayer.id,
            name: newPlayer.name
        }
    })
);

export const gameStart = () => (
    dispatch => ({
        type: GAME_START
    })
);
