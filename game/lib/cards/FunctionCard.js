import Card from '../../components/Card';
import { CARDS_HELPER_FUNCTION } from '../../constants/cards.js';
import { isFunction } from '../../util';
import espree from 'espree';

class FunctionCard extends Card {
    constructor() {
        super();
        this.type = CARDS_HELPER_FUNCTION;
        this.title = 'Function';
        this.implementation = 
`function helper() {

}`;
        this.example = 
`function helper() {
    return 4;
}
helper(); // -> 4`;
    }

    isInstanceOf(code) {
        const tree = espree.parse(code);
        return isFunction(tree);
    }
}

export default FunctionCard;
