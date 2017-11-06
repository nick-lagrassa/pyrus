import streams from '../index';

export const getSockets = (gameId=null, playerId=null) => {
    if(gameId) {
        return streams.filter(stream => stream.gameId === gameId);
    }
    return streams.filter(stream => stream.playerId === playerId);
}
