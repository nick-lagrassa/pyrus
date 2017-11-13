import Card from '../../components/Card';
import { CARDS_LINKED_LIST } from '../../constants/cards.js';

class LinkedListCard extends Card {
    constructor() {
        super();
        this.type = CARDS_LINKED_LIST;
        this.title = 'Linked List';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default LinkedListCard;
