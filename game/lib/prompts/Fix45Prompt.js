import Prompt from "../../components/Prompt";
import cards from "../cards";

class Fix45Prompt extends Prompt {
  constructor() {
    super();
    this._name = "Fix 45";
    this._signature = "function fix45(list)";
    this._constructor = "Fix45Prompt";

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
      title: "Fix 45",
      description:
        "Return an array that contains exactly the same numbers as the given array, but rearranged so that every 4 is immediately followed by a 5. The output should maintain the original location of 4's, but every other number may move. The array contains the same number of 4's and 5's, and every 4 has a number after it that is not a 4, and a 4 appears before any 5",
      examples:
        "Given list = [1,4,1,5,5,4,1]\nReturn [1,4,5,1,1,4,5]\n\nGiven list = [1,2,4,2,0,5]\nReturn [1,2,4,5,2,0]"
    };

    this._tests = [
      {
        input: [[1,2,4,2,0,5]],
        expected: [1,2,4,5,2,0]
      },
      {
        input: [[1,4,1,5,5,4,1]],
        expected: [1,4,5,1,1,4,5]
      },
      {
        input: [[0,0]],
        expected: [0,0]
      },
      {
        input: [[4,5]],
        expected: [4,5]
      },
      {
        input: [[1,0,-1,1,0,-4,0]],
        expected: [1,0,-1,1,0,-4,0]
      },
      {
        input: [[4,5,4,5,0]],
        expected: [4,5,4,5,0]
      },
      {
        input: [[1,4,9,0,0,1,2,5,0,4,5]],
        expected: [1,4,5,9,0,0,1,2,0,4,5]
      }
    ];

    this._testResults = [];
    this._testRunTimestampMS = Date.now();
  }
}

export default Fix45Prompt;
