import Card from '../../components/Card';
import { CARDS_STACK } from '../../constants/cards.js';

class StackCard extends Card {
    constructor() {
        super();
        this.type = CARDS_STACK;
        this.title = 'Stack';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default StackCard;
