export const activePlayerIndex = (turnCount, numPlayers) => {
    return turnCount % numPlayers;
}

export const getActivePlayer = (game, players) => {
    return players[activePlayerIndex(game.turnCount, players.length)];
}

export const myTurn = (me, game, players) => {
    return getActivePlayer(game, players).id === me.id;
}
