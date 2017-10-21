import Board from '../index';
import Player from '../../Player';
import ValidParenthesesPrompt from '../../../lib/prompts/ValidParenthesesPrompt';
import Editor from '../../Editor';

test('Board initializes correctly', () => {
    const question = new ValidParenthesesPrompt();
    const board = new Board(new Editor(), question);

    expect(board.players).toEqual([]);
    expect(board.prompt).toBe(question);
});

test('Board.addPlayer sets this._players', () => {
    const board = new Board(new Editor(), new ValidParenthesesPrompt());
    const p1 = new Player('Jared');
    const p2 = new Player('Joanne');

    board.addPlayer = p1;
    expect(board.players).toEqual([p1]);
    board.addPlayer = p2;
    expect(board.players).toEqual([p1, p2]);
});
