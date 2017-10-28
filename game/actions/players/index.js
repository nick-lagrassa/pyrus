import {
    PLAYERS_SET_PLAYER_HAND,
    PLAYERS_SET_PLAYER_NAME,
    PLAYERS_REGISTER_PLAYER,
} from '../../constants/players';

export const registerPlayer = (name, id, store) => ({
    type: PLAYERS_REGISTER_PLAYER,
    player: { name, id }
});

export const setPlayerHand = (hand, id) => ({
    type: PLAYERS_SET_PLAYER_HAND,
    hand,
    id
});

export const setPlayerName = name => ({
    type: PLAYERS_SET_PLAYER_NAME,
    name
});
