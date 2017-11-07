import { combineReducers } from 'redux';
import game from '../../../game/reducers/game';
import deck from '../../../game/reducers/deck';
import board from '../../../game/reducers/board';
import players from '../../../game/reducers/players';
import prompt from '../../../game/reducers/prompt';
import me from './me';

const rootReducer = combineReducers({
    game,
    deck,
    board,
    players,
    prompt,
    me
});

export default rootReducer;
