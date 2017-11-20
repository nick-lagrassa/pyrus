import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';
import { isConditional, isTernaryConditional, getAST } from '../../util';

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

    isInstanceOf(code) {
        const tree = getAST(code);
        return isConditional(tree) || isTernaryConditional(tree);
    }
}

export default ConditionalCard;
