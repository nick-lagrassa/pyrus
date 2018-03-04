import Card from "../../components/Card";
import { CARDS_WHILE_LOOP } from "../../constants/cards.js";
import { isWhileLoop, isEmptyLoopBlock, getAST } from "../../util";

class WhileCard extends Card {
  constructor() {
    super();
    this.type = CARDS_WHILE_LOOP;
    this.title = "While Loop";
    this.implementation = `while (cond) {

}`;
    this.example = `
var i = 0;
while (i < 3) {
    console.log(i);
    i++;
} // -> prints 0, 1, 2`;
  }

  isInstanceOf(code) {
    const tree = getAST(code);
    return isWhileLoop(tree) && isEmptyLoopBlock(tree.body[0]);
  }
}

export default WhileCard;
