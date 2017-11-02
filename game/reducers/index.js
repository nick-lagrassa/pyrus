import { combineReducers } from 'redux';
import game from './game';
import deck from './deck';
import board from './board';
import players from './players';
import prompt from './prompt';

const rootReducer = combineReducers({
    game,
    deck,
    board,
    players,
    prompt
});

export default rootReducer;
