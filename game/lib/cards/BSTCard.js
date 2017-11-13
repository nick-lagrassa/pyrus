import Card from '../../components/Card';
import { CARDS_BINARY_SEARCH_TREE } from '../../constants/cards.js';

class BSTCard extends Card {
    constructor() {
        super();
        this.type = CARDS_BINARY_SEARCH_TREE;
        this.title = 'Binary Search Tree';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default BSTCard;
