import Card from '../../components/Card';
import { CARDS_HELPER_FUNCTION } from '../../constants/cards.js';

class FunctionCard extends Card {
    constructor() {
        super();
        this._type = CARDS_HELPER_FUNCTION;
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default FunctionCard;
