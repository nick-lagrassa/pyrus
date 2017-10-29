import { combineReducers } from 'redux';
import game from './game';
import deck from './deck';
import board from './board';
import players from './players';

const rootReducer = combineReducers({
    game,
    deck,
    board,
    players,
});

export default rootReducer;
