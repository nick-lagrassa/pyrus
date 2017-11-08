import Card from '../../components/Card';
import { CARDS_BINARY_SEARCH_TREE } from '../../constants/cards.js';

class BSTCard extends Card {
    constructor() {
        super();
        this._type = CARDS_BINARY_SEARCH_TREE;
        this._title = 'Binary Search Tree';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default BSTCard;
