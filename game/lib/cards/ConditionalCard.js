import Card from '../../components/Card';
import { CARDS_CONDITIONAL } from '../../constants/cards.js';
import
    {
        isIfConditional,
        isTernaryConditional,
        isEmptyIfBlock,
        getAST
    } from '../../util';

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

    // Check if IF statement and empty IF block or if
    // ternary statement
    // string -> bool
    isInstanceOf(code) {
        const tree = getAST(code);
        if(isIfConditional(tree)) {
            return isEmptyIfBlock(tree.body[0]);
        } else {
            return isTernaryConditional(tree);
        }
    }
}

export default ConditionalCard;
