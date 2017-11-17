import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';

class ConditionalCard extends Card {
    constructor() {
        super();
        this.type = CARDS_CONDITIONAL;
        this.title = 'Conditional';
        this.implementation = 
`if (cond) {

} else if (otherCond) {

} else {

}`;
        this.example = '';
    }
}

export default ConditionalCard;
