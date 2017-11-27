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
        request(`${ settings.APP_BACKEND }/challenge/${ gameId }`)
            .then(body => resolve(JSON.parse(body)))
            .catch(err => {});
    });
}
