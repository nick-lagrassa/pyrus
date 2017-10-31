import { combineReducers } from 'redux';
import game from '../../../game/reducers/game';
import deck from '../../../game/reducers/deck';
import board from '../../../game/reducers/board';
import players from '../../../game/reducers/players';
import me from './me';

const rootReducer = combineReducers({
    game,
    deck,
    board,
    players,
    me
});

export default rootReducer;
