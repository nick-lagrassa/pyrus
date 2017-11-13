import Card from '../../components/Card';
import { CARDS_CLASS } from '../../constants/cards.js';

class ClassCard extends Card {
    constructor() {
        super();
        this.type = CARDS_CLASS;
        this.title = 'Class';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default ClassCard;
