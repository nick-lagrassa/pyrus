import Card from "../../components/Card";
import { CARDS_FOR_LOOP } from "../../constants/cards.js";
import { isForLoop, isEmptyLoopBlock, getAST } from "../../util";

class ForCard extends Card {
  constructor() {
    super();
    this.type = CARDS_FOR_LOOP;
    this.title = "For Loop";
    this.implementation = `for (var i = 0; i < 3; i++) {

}`;
    this.example = `for (var i = 0; i < 3; i++) {
    console.log(i);
} // -> prints 0, 1, 2`;
  }

  isInstanceOf(code) {
    const tree = getAST(code);
    return isForLoop(tree) && isEmptyLoopBlock(tree.body[0]);
  }
}

export default ForCard;
