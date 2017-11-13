import Card from '../../components/Card';
import { CARDS_HELPER_FUNCTION } from '../../constants/cards.js';

class FunctionCard extends Card {
    constructor() {
        super();
        this.type = CARDS_HELPER_FUNCTION;
        this.title = 'Function';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default FunctionCard;
