import {
    GAME_STATUS_INIT, 
    GAME_STATUS_RUNNING
} from '../constants/game';
import settings from '../config/settings';
import Game from '../components/Game';
import ValidParenthesesPrompt from '../lib/prompts/ValidParenthesesPrompt';
import ConsumeMove from '../components/ConsumeMove';
import DiscardMove from '../components/DiscardMove';
import WriteMove from '../components/WriteMove';

test('ValidParenthesesGame runs correctly', () => {
    const game = new Game(new ValidParenthesesPrompt(), null);
    expect(game.status).toBe(GAME_STATUS_INIT);
    expect(game._board.players).toHaveLength(0);

    expect(game.registerPlayer('Jack', 0)).toBe(true);
    expect(game._board.players).toHaveLength(1);
    expect(game._board.players[0].name).toBe('Jack');

    expect(game.registerPlayer('Jill', 1)).toBe(true);
    expect(game._board.players).toHaveLength(2);
    expect(game._board.players[1].name).toBe('Jill');

    expect(game.registerPlayer('Jornagan', 2)).toBe(false);
    expect(game._board.players).toHaveLength(2);

    game.start();
    expect(game.status).toBe(GAME_STATUS_RUNNING);
    expect(game.activePlayerIndex).toBe(0);

    expect(game._board.players[0].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START);
    expect(game._board.players[1].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START);

    for (let i = 0; i < settings.NUM_PLAYER_MOVES_PER_TURN; i++) {
        let playerJack = game._board.players[0];
        let discardMove = new DiscardMove(playerJack.id, playerJack.hand[0]);
        let oldDeckSize = game._board.deck.cards.length;
        game.receiveMove(discardMove);

        // this conditional needs to be kept in until we figure out how we want to handle 
        // players discarding cards until they reach settings.MAX_CARDS_PER_HAND
        if (i < settings.NUM_PLAYER_MOVES_PER_TURN - 1) {
            expect(game._board.players[0].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START);
            expect(game._board.deck.cards.length).toBe(oldDeckSize - 1);
        } else {
            expect(game._board.players[0].hand).toHaveLength(settings.NUM_CARDS_DRAWN_AT_GAME_START + settings.NUM_CARDS_DRAWN_PER_TURN);
            expect(game._board.deck.cards.length).toBe(oldDeckSize - 1 - settings.NUM_CARDS_DRAWN_PER_TURN);
        }
    }

    expect(game.activePlayerIndex).toBe(1);
    expect(game.numMovesRemaining).toBe(4);
});
