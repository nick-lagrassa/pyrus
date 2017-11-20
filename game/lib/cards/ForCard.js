import Card from '../../components/Card';
import { CARDS_FOR_LOOP } from '../../constants/cards.js';
import { isForLoop } from '../../util';
import espree from 'espree';

class ForCard extends Card {
    constructor() {
        super();
        this.type = CARDS_FOR_LOOP;
        this.title = 'For Loop';
        this.implementation = 
`for (var i = 0; i < 3; i++) {

}`;
        this.example = '';
    }

    isInstanceOf(code) {
        const tree = espree.parse(code);
        return isForLoop(tree);
    }
}

export default ForCard;
