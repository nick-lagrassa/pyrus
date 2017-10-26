import {
    PLAYERS_SET_PLAYER_HAND,
    PLAYERS_SET_PLAYER_NAME,
    PLAYERS_REGISTER_PLAYER,
} from '../../constants/players';

export const registerPlayer = (name, id) => ({
    type: PLAYERS_SET_PLAYER_HAND,
    player: {
        id,
        name
    }
});

export const setPlayerHand = hand => ({
    type: PLAYERS_SET_PLAYER_HAND,
    hand    
});

export const setPlayerName = name => ({
    type: PLAYERS_SET_PLAYER_NAME,
    name
});
