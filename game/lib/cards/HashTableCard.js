import Card from '../../components/Card';
import { CARDS_HASH_TABLE } from '../../constants/cards.js';

class HashTableCard extends Card {
    constructor() {
        super();
        this._type = CARDS_HASH_TABLE;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default HashTableCard;
