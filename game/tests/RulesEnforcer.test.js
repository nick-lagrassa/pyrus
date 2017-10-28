import makeGame from '../lib/games/validParenthesesGame';
import settings from '../config/settings';
import ConsumeMove from '../components/ConsumeMove';
import DiscardMove from '../components/DiscardMove';
import WriteMove from '../components/WriteMove';
import TestCard from '../lib/cards/TestCard';

describe('isLegalMove', () => {
    describe('Discard Move', () => {
        test('is legal', () => {
            const game = makeGame()
            game.registerPlayer('Jack');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardMove(player, player.hand[0]);
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(true);
        });

        test('is illegal', () => {
            const game = makeGame()
            game.registerPlayer('Jill');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardMove(player, new TestCard());
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(false);
        });
    });
});
