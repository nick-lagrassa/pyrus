import Card from '../../components/Card';
import { CARDS_ARRAY } from '../../constants/cards.js';
import { isArray, getAST } from '../../util';

class ArrayCard extends Card {
    constructor() {
        super();
        this.type = CARDS_ARRAY;
        this.title = 'Array';
        this.implementation = 'var array = [];';
        this.example = 
`arr.length; // -> 0
arr.push(1);
arr[0]; // -> 1
arr.pop(); // -> 1
arr; // -> []`;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isArray(tree);
    }
}

export default ArrayCard;
