import Card from '../../components/Card';
import { CARDS_WHILE_LOOP } from '../../constants/cards.js';

class WhileCard extends Card {
    constructor() {
        super();
        this.type = CARDS_WHILE_LOOP;
        this.title = 'While Loop';
        this.implementation = 
`while (cond) {

}`;
        this.example = '';
    }
}

export default WhileCard;
