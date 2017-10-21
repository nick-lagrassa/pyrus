import Game from '../index';
import Player from '../../Player';
import Editor from '../../Editor';
import prompts from '../../../lib/prompts';

const { ValidParenthesesPrompt } = prompts

test('Game starts and runs', () => {
    const game = new Game(new Editor(), new ValidParenthesesPrompt());
    const p1 = new Player('Jared');
    const p2 = new Player('Joanne');
    const p3 = new Player('Arthur');

    expect(game.registerPlayer(p1)).toBe(true);
    expect(game.registerPlayer(p2)).toBe(true);
    expect(game.registerPlayer(p3)).toBe(false);

    game.start();
});
