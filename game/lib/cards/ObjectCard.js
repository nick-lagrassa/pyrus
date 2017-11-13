import Card from '../../components/Card';
import { CARDS_OBJECT } from '../../constants/cards.js';

class ObjectCard extends Card {
    constructor() {
        super();
        this.type = CARDS_OBJECT;
        this.title = 'Object';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default ObjectCard;
