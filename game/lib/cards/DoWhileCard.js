import Card from '../../components/Card';
import { CARDS_DO_WHILE_LOOP } from '../../constants/cards.js';

class DoWhileCard extends Card {
    constructor() {
        super();
        this._type = CARDS_DO_WHILE_LOOP;
        this._title = 'Do While';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default DoWhileCard;
