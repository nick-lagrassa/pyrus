import makeGame from '../lib/games/validParenthesesGame';
import settings from '../config/settings';
import ConsumeMove from '../components/ConsumeMove';
import DiscardMove from '../components/DiscardMove';
import WriteMove from '../components/WriteMove';
import TestCard from '../lib/cards/TestCard';
import cards from '../lib/cards'

const nonPrimitiveCode = [
    'var i = { \'x\': 5 }',
    'var i = { }',
    'let array = [1,2,3,4]',
    'if (true) {}',
    '  for ( i = 0; i < 5; i++) {}',
    'while(i == true) {}',
    'do {} while(true)',
    ' i == 3 ? i++ : i--;',
    'class LinkedList\t {}',
    // 'else {}',
    // 'else if {}',
    'switch(action){}',
    // 'case Move:'
];

const functionCode = [
    'helperFunction = () => {}',
    'var helperFunction = function() {}',
    //'function() {}',
    'var c = (function() {})',
    'var helperFunction = function foo() {}',
    'var c = (function() { return true })',
    'var foo = new function() {}'
];

describe('isLegalMove', () => {
    let game, player;
    beforeEach(() => {
        game = makeGame();
        game.registerPlayer('Jill');
        game.start();
        player = game._board.players[0];
    });

    describe('getEditorDifference', () => {
        test('returns string of added code only', () => {
            const boardEditor = 'class Editor {\n\n}';
            const newCode = 'class Editor {\n\tconstructor() {\n\t\tthis.hi = 5;\n\t}\n}';
            expect(game._re.getEditorDifference(boardEditor, newCode)).toEqual('\tconstructor() {\t\tthis.hi = 5;\n\t}\n');
        });
    });

    describe('Discard Move', () => {
        test('is legal', () => {
            const game = makeGame()
            game.registerPlayer('Jack');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardMove(player.id, player.hand[0]);
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(true);
        });

        test('is illegal', () => {
            const game = makeGame()
            game.registerPlayer('Jill');
            game.start()
            const player = game._board.players[0];
            const discardMove = new DiscardMove(player.id, new TestCard());
            expect(game._re.isLegalMove(game._board, discardMove)).toBe(false);
        });
    });

    describe('Consume Card Move', () => {
        describe('is legal', () => {
            for(let key in cards) {
                test(`${ key }`, () => {
                    player.hand[0] = new cards[key];
                    const consumeMove = new ConsumeMove(player.id, player.hand[0], player.hand[0].implementation);
                    expect(game._re.isLegalMove(game._board, consumeMove)).toBe(true);
                });
            }
        });

        test('is illegal', () => {
            const objectCode = 'var i = { }';
            const { ArrayCard } = cards;
            const badConsumeMove = new ConsumeMove(player.id, new ArrayCard(), objectCode);
            expect(game._re.isLegalMove(game._board, badConsumeMove)).toBe(false);
        });
    });

    describe('Write Move', () => {
        test('is legal', () => {
            const code = 'var i = 5;';
            const code2 = 'x = x.insertFunction(arg);';
            const writeMove = new WriteMove(player, code);
            const writeMove2 = new WriteMove(player, code2);
            expect(game._re.isLegalMove(game._board, writeMove)).toBe(true);
            expect(game._re.isLegalMove(game._board, writeMove2)).toBe(true);
        });

        describe('is illegal', () => {
            test('non-primitive code', () => {
                for(let i = 0; i < nonPrimitiveCode.length; i++) {
                    const writeMove = new WriteMove(player, nonPrimitiveCode[i]);
                    expect(game._re.isLegalMove(game._board, writeMove)).toBe(false);
                }
            });

            test('helper function creation', () => {
                for(let i = 0; i < functionCode.length; i++) {
                    const writeMove = new WriteMove(player, functionCode[i]);
                    expect(game._re.isLegalMove(game._board, writeMove)).toBe(false);
                }
            });
        });
    });
});
