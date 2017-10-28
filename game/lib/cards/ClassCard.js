import Card from '../../components/Card';
import { CARDS_CLASS } from '../../constants/cards.js';

class ClassCard extends Card {
    constructor() {
        super();
        this._type = CARDS_CLASS;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default ClassCard;
