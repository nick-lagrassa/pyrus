import settings from '../config/settings';
import request from 'request-promise-native';

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

export const startSocket = async () => {
    return new Promise(resolve => {
        resolve(new Websocket(`${ setting.WS_APP_BACKEND }`));
    });
}
