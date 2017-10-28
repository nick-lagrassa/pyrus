import makeGame from '../lib/games/validParenthesesGame';
import settings from '../config/settings';
import ConsumeAction from '../components/ConsumeAction';
import DiscardAction from '../components/DiscardAction';
import WriteAction from '../components/WriteAction';
import TestCard from '../lib/cards/TestCard';

describe('isLegalAction', () => {
    describe('Discard Move', () => {
        test('is legal', () => {
            const game = makeGame()
            game.registerPlayer('Jack');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardAction(player, player.hand[0]);
            expect(game._re.isLegalAction(game._board, discardMove)).toBe(true);
        });

        test('is illegal', () => {
            const game = makeGame()
            game.registerPlayer('Jill');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardAction(player, new TestCard());
            expect(game._re.isLegalAction(game._board, discardMove)).toBe(false);
        });
    });
});
