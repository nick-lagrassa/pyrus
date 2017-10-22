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
        this._tests = [
            {
                input: '()',
                output: true
            }
        ];

        this._cardSet = [
            new HashTableCard(),
            new HashTableCard(),
            new WhileCard(),
            new WhileCard(),
            new FunctionCard(),
            new QueueCard(),
            new BSTCard(),
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
            new LinkedListCard(),
            new ForCard(),
            new ClassCard(),
            new SwitchCard()
        ];

        this._info = {
            title: '',
            description: '',
            examples: ''
        };
    }
}

export default ValidParenthesesPrompt;
