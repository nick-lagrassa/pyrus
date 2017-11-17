import Card from '../../components/Card';
import { CARDS_STACK } from '../../constants/cards.js';

class StackCard extends Card {
    constructor() {
        super();
        this.type = CARDS_STACK;
        this.title = 'Stack';
        this.implementation = 'var stack = [];';
        this.example = 
`stack.push(1);
stack.push(2);
stack.pop(); // -> 2`;
    }
}

export default StackCard;
