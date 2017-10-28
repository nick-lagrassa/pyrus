import Card from '../../components/Card';
import { CARDS_OBJECT } from '../../constants/cards.js';

class ObjectCard extends Card {
    constructor() {
        super();
        this._type = CARDS_OBJECT;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default ObjectCard;
