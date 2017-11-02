export const activePlayerIndex = (turnCount, numPlayers) => {
    return turnCount % numPlayers;
}
