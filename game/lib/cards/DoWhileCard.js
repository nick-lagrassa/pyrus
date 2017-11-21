import Card from '../../components/Card';
import { CARDS_DO_WHILE_LOOP } from '../../constants/cards.js';
import { isDoWhileLoop, getAST } from '../../util';

class DoWhileCard extends Card {
    constructor() {
        super();
        this.type = CARDS_DO_WHILE_LOOP;
        this.title = 'Do While';
        this.implementation =
`do {

} while (cond);`;
        this.example = 'var hash = { "foo": "bar" };';
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isDoWhileLoop(tree);
    }
}

export default DoWhileCard;
