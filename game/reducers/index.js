import { combineReducers } from 'redux';
import game from './game';
import deck from './deck';
import board from './board';

const rootReducer = combineReducers({
    game,
    deck,
    board
});

export default rootReducer;
