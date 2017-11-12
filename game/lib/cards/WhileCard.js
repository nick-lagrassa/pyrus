import Card from '../../components/Card';
import { CARDS_WHILE_LOOP } from '../../constants/cards.js';

class WhileCard extends Card {
    constructor() {
        super();
        this._type = CARDS_WHILE_LOOP;
        this._title = 'While Loop';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default WhileCard;
