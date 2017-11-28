import Prompt from '../../components/Prompt';
import cards from '../cards';

class ArrayTwoSumPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Example Challenge';
        this._signature = 'function example(n)';

        this._cardSet = [
            new cards.ArrayCard,
            new cards.HashTableCard,
            new cards.WhileCard,
            new cards.FunctionCard,


            new cards.StackCard,
            new cards.DoWhileCard,
            new cards.ArrayCard,
            new cards.ForCard,


            new cards.ConditionalCard,
            new cards.ObjectCard,
            new cards.ObjectCard,
            new cards.ArrayCard,
            new cards.ArrayCard,
            new cards.ForCard,
            new cards.ForCard,
            new cards.ForCard,
            new cards.SwitchCard
        ];

        this._info = {
            title: 'Example Challenge',
            description: 'Given an array of numbers, return a new array with all the numbers in that array doubled',
            examples: 'Given [1, 2, 4, 2]\nReturn [2, 4, 8, 4]',
        };

        this._tests = [
            {
                input: [[1]],
                expected: [2]
            }, {
                input: [[2, 3, 5, 6]],
                expected: [4, 6, 10, 12]
            }
        ]

        this._testResults = [];
        this._testRunTimestampMS = Date.now()
    }
}

export default ArrayTwoSumPrompt;
