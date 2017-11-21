import Card from '../../components/Card';
import { CARDS_WHILE_LOOP } from '../../constants/cards.js';
import { isWhileLoop, getAST } from '../../util';

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
        const tree = getAST(code);
        return isWhileLoop(tree);
    }
}

export default WhileCard;
