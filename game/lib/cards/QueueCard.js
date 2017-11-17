import Card from '../../components/Card';
import { CARDS_QUEUE } from '../../constants/cards.js';

class QueueCard extends Card {
    constructor() {
        super();
        this.type = CARDS_QUEUE;
        this.title = 'Queue';
        this.implementation = 'var queue = [];';
        this.example = 
`queue.push(1);
queue.push(2);
queue.shift(); // -> 1`;
    }
}

export default QueueCard;
