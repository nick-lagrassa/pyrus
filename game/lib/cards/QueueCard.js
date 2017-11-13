import Card from '../../components/Card';
import { CARDS_QUEUE } from '../../constants/cards.js';

class QueueCard extends Card {
    constructor() {
        super();
        this.type = CARDS_QUEUE;
        this.title = 'Queue';
        this.implementation = 'var hash = {};';
        this.example = 'var hash = { "foo": "bar" };';
    }
}

export default QueueCard;
