import Card from '../../components/Card';
import { CARDS_HASH_TABLE } from '../../constants/cards.js';

class HashTableCard extends Card {
    constructor() {
        super();
        this.type = CARDS_HASH_TABLE;
        this.title = 'Hash Table';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default HashTableCard;
