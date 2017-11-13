import Card from '../../components/Card';
import { CARDS_DO_WHILE_LOOP } from '../../constants/cards.js';

class DoWhileCard extends Card {
    constructor() {
        super();
        this.type = CARDS_DO_WHILE_LOOP;
        this.title = 'Do While';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default DoWhileCard;
