import Card from '../../components/Card';
import { CARDS_FOR_LOOP } from '../../constants/cards.js';

class ForCard extends Card {
    constructor() {
        super();
        this._type = CARDS_FOR_LOOP;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default ForCard;
