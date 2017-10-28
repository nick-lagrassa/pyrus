import Card from '../../components/Card';
import { CARDS_ARRAY } from '../../constants/cards.js';

class ArrayCard extends Card {
    constructor() {
        super();
        this._type = CARDS_ARRAY;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default ArrayCard;
