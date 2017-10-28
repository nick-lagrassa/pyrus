import Card from '../../components/Card';
import { CARDS_LINKED_LIST } from '../../constants/cards.js';

class LinkedListCard extends Card {
    constructor() {
        super();
        this._type = CARDS_LINKED_LIST;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default LinkedListCard;
