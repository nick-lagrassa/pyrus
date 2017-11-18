import Card from '../../components/Card';
import { CARDS_CLASS } from '../../constants/cards.js';
import { isClass } from '../../util';
import espree from 'espree';

class ClassCard extends Card {
    constructor() {
        super();
        this.type = CARDS_CLASS;
        this.title = 'Class';
        this.implementation = `class Name {\n}`;
        this.example = `class Name {\n\tconstructor() {}\n}`;
    }

    isInstanceOf(code) {
        const tree = espree.parse(code);
        return isClass(tree);
    }
}

export default ClassCard;
