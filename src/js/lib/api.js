import request from 'request-promise-native';

export const newGame = async (game) => {
    return new Promise(resolve => {
        request(`http://${ process.env.APP_BACKEND }:${ process.env.APP_BACKEND_PORT }/new/${ game }`)
            .then(body => resolve(JSON.parse(body)))
            .catch(err => {});
    });
}

export const getGame = async (gameId) => {
    return new Promise(resolve => {
        request(`http://${ process.env.APP_BACKEND }:${ process.env.APP_BACKEND_PORT }/challenge/${ gameId }`)
            .then(body => resolve(JSON.parse(body)))
            .catch(err => {});
    });
}
