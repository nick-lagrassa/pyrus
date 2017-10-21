import Prompt from '../../components/Prompt';
import HashTableCard from '../cards/HashTableCard';

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
            new HashTableCard()
        ];

        this._info = {
            title: '',
            description: '',
            examples: ''
        };
    }
}

export default ValidParenthesesPrompt;