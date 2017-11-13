import Card from '../../components/Card';
import { CARDS_SWITCH_CASE } from '../../constants/cards.js';

class SwitchCard extends Card {
    constructor() {
        super();
        this.type = CARDS_SWITCH_CASE;
        this.title = 'Switch';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default SwitchCard;
