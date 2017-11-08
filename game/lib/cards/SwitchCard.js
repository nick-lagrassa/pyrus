import Card from '../../components/Card';
import { CARDS_SWITCH_CASE } from '../../constants/cards.js';

class SwitchCard extends Card {
    constructor() {
        super();
        this._type = CARDS_SWITCH_CASE;
        this._title = 'Switch';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default SwitchCard;
