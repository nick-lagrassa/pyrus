import makeGame from '../lib/games/validParenthesesGame';
import settings from '../config/settings';
import ConsumeMove from '../components/ConsumeMove';
import DiscardMove from '../components/DiscardMove';
import WriteMove from '../components/WriteMove';
import TestCard from '../lib/cards/TestCard';


describe('isLegalMove', () => {
    let game, player;
    beforeEach(() => {
        game = makeGame();
        game.registerPlayer('Jill');
        game.start();
        player = game._board.players[0];
    });

    describe('Discard Move', () => {
        test('is legal', () => {
            const discardMove = new DiscardMove(player, player.hand[0]);
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(true);
        });

        test('is illegal', () => {
            const discardMove = new DiscardMove(player, new TestCard());
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(false);
        });
    });

    describe('Consume Card Move', () => {
        test('is legal', () => {
            const consumeMove = new ConsumeMove(player, player.hand[0]);
            expect(game._re.isLegalMove(game._board, consumeMove)).toBe(true);
        });

        test('is illegal', () => {
            const consumeMove = new ConsumeMove(player, new TestCard());
            expect(game._re.isLegalMove(game._board, consumeMove)).toBe(false);
        });
    });

    describe('Write Move', () => {
        test('is legal', () => {
            const code = 'var i = 5;';
            const code2 = 'x = x.insertFunctin(arg);';
            const writeMove = new WriteMove(player, code);
            const writeMove2 = new WriteMove(player, code2);
            expect(game._re.isLegalMove(game._board, writeMove)).toBe(true);
            expect(game._re.isLegalMove(game._board, writeMove2)).toBe(true);
        });

        describe('is illegal', () => {
            test('non-primitive code', () => {
                const logicCode = ['var i = { \'x\': 5 }',
                                   'var i = { }',
                                   'let array = [1,2,3,4]',
                                   'if (true) {}',
                                   '  for ( i = 0; i < 5; i++) {}',
                                   'while(i == true) {}',
                                   'do {} while(true)',
                                   ' i == 3 ? i++ : i--;',
                                   'class LinkedList\t {}',
                                   'else {}',
                                   'else if {}',
                                   'switch(action){}',
                                   'case Move:']
                for(let i = 0; i < logicCode.length; i++) {
                    const writeMove = new WriteMove(player, logicCode[i]);
                    expect(game._re.isLegalMove(game._board, writeMove)).toBe(false);
                }
            });

            test('helper function creation', () => {
                const logicCode = ['helperFunction = () => {}',
                                   'var helperFunction = function() {}',
                                   'function() {}',
                                   'var c = (function() {})',
                                   'var helperFunction = function foo() {}',
                                   'var c = (function() { return true })',
                                   'var foo = new function() {}',
                                   ]
                for(let i = 0; i < logicCode.length; i++) {
                    const writeMove = new WriteMove(player, logicCode[i]);
                    expect(game._re.isLegalMove(game._board, writeMove)).toBe(false);
                }
            });
        });
    });
});
