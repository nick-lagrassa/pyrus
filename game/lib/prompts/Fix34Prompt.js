import Prompt from "../../components/Prompt";
import cards from "../cards";

class Fix34Prompt extends Prompt {
  constructor() {
    super();
    this._name = "Fix 34";
    this._signature = "function fix34(list)";
    this._constructor = "Fix34Prompt";

    this._cardSet = [
      new cards.HashTableCard(),
      new cards.WhileCard(),
      new cards.WhileCard(),
      new cards.FunctionCard(),
      new cards.DoWhileCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ObjectCard(),
      new cards.ObjectCard(),
      new cards.ArrayCard(),
      new cards.ArrayCard(),
      new cards.ArrayCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Fix 34",
      description:
        "Return an array that contains exactly the same numbers as the given array, but rearranged so that every 3 is immediately followed by a 4. The output should maintain the original location of 3's, but every other number may move. The array contains the same number of 3's and 4's, and every 3 has a number after it that is not a 3.",
      examples:
        "Given list = [1,3,1,4,4,3,1]\nReturn [1,3,4,1,1,3,4]\n\nGiven list = [1,2,3,2,0,4]\nReturn [1,2,3,4,2,0]"
    };

    this._tests = [
      {
        input: [[1, 2, 4, 2, 0, 5]],
        expected: [1, 2, 4, 5, 2, 0]
      },
      {
        input: [[1, 4, 1, 5, 5, 4, 1]],
        expected: [1, 4, 5, 1, 1, 4, 5]
      },
      {
        input: [[0, 0]],
        expected: [0, 0]
      },
      {
        input: [[4, 5]],
        expected: [4, 5]
      },
      {
        input: [[1, 0, -1, 1, 0, -4, 0]],
        expected: [1, 0, -1, 1, 0, -4, 0]
      },
      {
        input: [[4, 5, 4, 5, 0]],
        expected: [4, 5, 4, 5, 0]
      },
      {
        input: [[1, 4, 9, 0, 0, 1, 2, 5, 0, 4, 5]],
        expected: [1, 4, 5, 9, 0, 0, 1, 2, 0, 4, 5]
      }
    ];

    this._testResults = [];
    this._testRunTimestampMS = Date.now();
  }
}

export default Fix34Prompt;
