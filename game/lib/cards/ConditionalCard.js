import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';
import { isIfConditional, isTernaryConditional, getAST } from '../../util';

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
        this.example = 
`if (true) {
    console.log('true');
} else {
    console.log('false');
} // -> prints 'true'
`;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isIfConditional(tree) || isTernaryConditional(tree);
    }
}

export default ConditionalCard;
