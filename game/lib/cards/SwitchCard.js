import Card from '../../components/Card';
import { CARDS_SWITCH_CASE } from '../../constants/cards.js';
import {
    isSwitch,
    isEmptySwitchBlock,
    getAST } from '../../util';

class SwitchCard extends Card {
    constructor() {
        super();
        this.type = CARDS_SWITCH_CASE;
        this.title = 'Switch';
        this.implementation = 
`switch(day) {
    case "Monday":
        break;
    case "Tuesday":
        break;
    default:
        break;
}`;
        this.example = 
`var day = 'Monday';
switch(day) {
    case "Monday":
        console.log('Monday');
        break;
    case "Tuesday":
        console.log('Tuesday');
        break;
    default:
        break;
} // -> prints 'Monday'`;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isSwitch(tree) && isEmptySwitchBlock(tree.body[0]);
    }
}

export default SwitchCard;
