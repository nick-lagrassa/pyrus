import settings from '../config/settings';
import request from 'request-promise-native';
import ReconnectWebSocket from 'reconnectingwebsocket';

export const newGame = async (game) => {
    return new Promise(resolve => {
        request(`${ settings.APP_BACKEND }/new/${ game }`)
            .then(body => resolve(JSON.parse(body)))
            .catch(err => {});
    });
}

export const getGame = async (gameId) => {
    return new Promise(resolve => {
        request(`${ settings.APP_BACKEND }/game/${ gameId }`)
            .then(body => resolve(JSON.parse(body)))
            .catch(err => {});
    });
}

export const startSocket = async (playerId) => {
    const socket = new ReconnectWebSocket(
                          (location.protocol.includes('https') ? 'wss' : 'ws') + '://' + `${ setting.WS_APP_BACKEND }`);
    //socket.emit('setup', playerId);
    return socket;
}
