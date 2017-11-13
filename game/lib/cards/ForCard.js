import Card from '../../components/Card';
import { CARDS_FOR_LOOP } from '../../constants/cards.js';

class ForCard extends Card {
    constructor() {
        super();
        this.type = CARDS_FOR_LOOP;
        this.title = 'For Loop';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default ForCard;
