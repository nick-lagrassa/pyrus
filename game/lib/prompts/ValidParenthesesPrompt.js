import Prompt from '../../components/Prompt';
import cards from '../cards';

const {
    HashTableCard,
    WhileCard,
    FunctionCard,
    QueueCard,
    BSTCard,
    StackCard,
    DoWhileCard,
    ConditionalCard,
    ObjectCard,
    ArrayCard,
    LinkedListCard,
    ForCard,
    ClassCard,
    SwitchCard
} = cards;

class ValidParenthesesPrompt extends Prompt {
    constructor() {
        super();
        this._name = 'Valid Parentheses';
        this._signature = 'function validParentheses(str)';

        this._cardSet = [
            new HashTableCard(),
            new HashTableCard(),
            new WhileCard(),
            new WhileCard(),
            new FunctionCard(),
            new QueueCard(),
            new StackCard(),
            new DoWhileCard(),
            new ConditionalCard(),
            new ConditionalCard(),
            new ConditionalCard(),
            new ObjectCard(),
            new ObjectCard(),
            new ArrayCard(),
            new ArrayCard(),
            new ArrayCard(),
            new ForCard(),
            new SwitchCard()
        ];

        this._info = {
            title: 'Valid Parentheses',
            description: 'Given a string containing some combination of the parentheses `()`, `[]`, `{}`, and the space character (\s), return whether that string contains a valid sequence of parens.',
            examples: 'Given: `()`\nReturn: true\n\nGiven: `(]`\nReturn: false'
        };

        this._tests = [
            {
                input: ['()'],
                expected: true
            }, {
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

        // tests:
        //  check empty string
        //  check multiple spaces
        //  check against queue implementation
        //  check ending space character
        this._hidden_tests = [
            {
                input: [''],
                expected: true
            }, {
                input: ['[(  ) ]'],
                expected: true
            }, {
                input: ['{[}]'],
                expected: false
            }, {
                input: ['()[]{} '],
                expected: true
            }
        ];

        this._testResults = [];
        this._testRunTimestampMS = Date.now();
    }
}

export default ValidParenthesesPrompt;
