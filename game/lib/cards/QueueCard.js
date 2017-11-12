import Card from '../../components/Card';
import { CARDS_QUEUE } from '../../constants/cards.js';

class QueueCard extends Card {
    constructor() {
        super();
        this._type = CARDS_QUEUE;
        this._title = 'Queue';
        this._implementation = 'var hash = {};';
        this._example = 'var hash = { "foo": "bar" };';
    }
}

export default QueueCard;
