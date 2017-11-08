import Card from '../../components/Card';
import { CARDS_STACK } from '../../constants/cards.js';

class StackCard extends Card {
    constructor() {
        super();
        this._type = CARDS_STACK;
        this._title = 'Stack';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default StackCard;
