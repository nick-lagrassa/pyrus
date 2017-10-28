import makeGame from '../lib/games/validParenthesesGame';
import {
    GAME_STATUS_INIT, 
    GAME_STATUS_RUNNING
} from '../constants/game';
import settings from '../config/settings';
import ConsumeAction from '../components/ConsumeAction';
import DiscardAction from '../components/DiscardAction';
import WriteAction from '../components/WriteAction';

test('ValidParenthesesGame runs correctly', () => {
    const game = makeGame();
    expect(game.status).toBe(GAME_STATUS_INIT);
    expect(game._board.players).toHaveLength(0);

    expect(game.registerPlayer('Jack')).toBe(true);
    expect(game._board.players).toHaveLength(1);
    expect(game._board.players[0].name).toBe('Jack');

    const playerJack = game._board.players[0];

    expect(game.registerPlayer('Jill')).toBe(true);
    expect(game._board.players).toHaveLength(2);
    expect(game._board.players[1].name).toBe('Jill');

    const playerJill = game._board.players[1];

    expect(game.registerPlayer('Jornagan')).toBe(false);
    expect(game._board.players).toHaveLength(2);

    game.start();
    expect(game.status).toBe(GAME_STATUS_RUNNING);
    expect(game.activePlayerIndex).toBe(0);

    expect(game._board.players[0].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START);
    expect(game._board.players[1].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START);
});
