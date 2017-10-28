import settings from '../config/settings';
import request from 'request-promise-native';

export const newGame = async (game) => {
    return new Promise(resolve => {
        request(`${settings.APP_BACKEND}/new/${game}`)
            .then(body => resolve(body))
            .catch(err => {});
    })
}
