import Card from '../../components/Card';
import { CARDS_ARRAY } from '../../constants/cards.js';

class ArrayCard extends Card {
    constructor() {
        super();
        this.type = CARDS_ARRAY;
        this.title = 'Array';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default ArrayCard;
