import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';

class ConditionalCard extends Card {
    constructor() {
        super();
        this._type = CARDS_CONDITIONAL;
        this._title = 'Conditional';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default ConditionalCard;
