import Card from "../../components/Card";
import { CARDS_STACK } from "../../constants/cards.js";
import { isStack, getAST } from "../../util";

class StackCard extends Card {
  constructor() {
    super();
    this.type = CARDS_STACK;
    this.title = "Stack";
    this.implementation = "var stack = [];";
    this.example = `stack.push(1);
stack.push(2);
stack.pop(); // -> 2`;
  }

  isInstanceOf(code) {
    const tree = getAST(code);
    return isStack(tree);
  }
}

export default StackCard;
