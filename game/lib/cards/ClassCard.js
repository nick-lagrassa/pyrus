import Card from '../../components/Card';
import { CARDS_CLASS } from '../../constants/cards.js';
import { isClass, getAST } from '../../util';

class ClassCard extends Card {
    constructor() {
        super();
        this.type = CARDS_CLASS;
        this.title = 'Class';
        this.implementation = `class Name {\n}`;
        this.example = `class Name {\n\tconstructor() {}\n}`;
    }

    isInstanceOf(code) {
        const tree = getAST(code);
        return isClass(tree);
    }
}

export default ClassCard;
