import game from '../components/Game';
import store from '../store';

const PLAYER_ADD_REQUEST = 'PLAYER_ADD_REQUEST';
const PLAYER_ADD_SUCCESS = 'PLAYER_ADD_SUCCESS';
const PLAYER_ADD_FAILURE = 'PLAYER_ADD_FAILURE';


const playerAddRequest = newPlayer => (
    dispatch => {
        game.registerPlayer(newPlayer)
    }
);
