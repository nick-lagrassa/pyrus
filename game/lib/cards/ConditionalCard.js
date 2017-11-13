import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';

class ConditionalCard extends Card {
    constructor() {
        super();
        this.type = CARDS_CONDITIONAL;
        this.title = 'Conditional';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default ConditionalCard;
