import {
    PLAYERS_SET_PLAYER_HAND,
    PLAYERS_SET_PLAYER_NAME,
    PLAYERS_REGISTER_PLAYER,
    PLAYERS_GIVE_PLAYER_CARDS,
    PLAYERS_DISCARD_PLAYER_CARD,
    PLAYERS_REMOVE_PLAYER
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

export const givePlayerCards = (cards, id) => ({
    type: PLAYERS_GIVE_PLAYER_CARDS,
    cards,
    id
});

export const discardPlayerCard = (card, id) => ({
    type: PLAYERS_DISCARD_PLAYER_CARD,
    card,
    id
});

export const removePlayer = id => ({
    type: PLAYERS_REMOVE_PLAYER,
    id
});

