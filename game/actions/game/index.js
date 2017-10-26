import {
    GAME_REGISTER_PLAYER,
    GAME_START
} from '../../constants/game';

export const registerPlayer = newPlayer => ({
    type: GAME_REGISTER_PLAYER,
    player: {
        id: newPlayer.id,
        name: newPlayer.name
    }
});

export const gameStart = () => ({
    type: GAME_START
});
