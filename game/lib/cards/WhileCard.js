import Card from '../../components/Card';
import { CARDS_WHILE_LOOP } from '../../constants/cards.js';
import { isLoop } from '../../util';
import espree from 'espree';

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

    isInstanceOf(code) {
        const tree = espree.parse(code);
        return isLoop(tree);
    }
}

export default WhileCard;
