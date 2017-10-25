import store from '../store';

const PLAYER_REGISTER = 'PLAYER_REGISTER';

expo rtconst playerAddRequest = newPlayer => (
    dispatch => ({
        type: PLAYER_REGISTER,
        action: {
            id: newPlayer.id,
            name: newPlayer.name
        }
    })
);
