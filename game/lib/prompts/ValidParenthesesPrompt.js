import Prompt from '../../components/Prompt';
import cards from '../cards';

class ValidParenthesesPrompt extends Prompt {
    constructor() {
        super();
        this.name = 'Valid Parentheses';
        this.signature = 'function validParentheses(str)';
        this.constructor = 'MergeArraysPrompt';

        this.cardSet = [
            new cards.HashTableCard(),
            new cards.HashTableCard(),
            new cards.WhileCard(),
            new cards.WhileCard(),
            new cards.FunctionCard(),
            new cards.QueueCard(),
            new cards.StackCard(),
            new cards.DoWhileCard(),
            new cards.ConditionalCard(),
            new cards.ConditionalCard(),
            new cards.ConditionalCard(),
            new cards.ObjectCard(),
            new cards.ObjectCard(),
            new cards.ArrayCard(),
            new cards.ArrayCard(),
            new cards.ArrayCard(),
            new cards.ForCard(),
            new cards.SwitchCard()
        ];

        this.info = {
            title: 'Valid Parentheses',
            description: 'Given a string containing some combination of the parentheses `()`, `[]`, `{}`, and the space character (\s), return whether that string contains a valid sequence of parens.',
            examples: 'Given: `()`\nReturn: true\n\nGiven: `(]`\nReturn: false'
        };

        this.exampleTests = [
            {
                input: ['()'],
                expected: true
            }
        ];

        this.tests = [
            {
                input: ['({[]})'],
                expected: true
            }, {
                input: ['{]'],
                expected: false
            }, {
                input: ['()[]{}'],
                expected: true
            }, {
                input: [' (({} {}) [])'],
                expected: true
            }, {
                input: ['(((()){})'],
                expected: false
            }, {
                input: ['{[]{{()}}}}}}}'],
                expected: false
            }
        ];

        this.exampleTestResults = [];
        this.testResults = [];
    }
}

export default ValidParenthesesPrompt;
