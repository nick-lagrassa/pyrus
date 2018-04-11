import Prompt from "../../components/Prompt";
import cards from "../cards";

class AddingMachinePrompt extends Prompt {
  constructor() {
    super();
    this._name = "Adding Machine";
    this._signature = "function addingMachine(list)";
    this._constructor = "AddingMachinePrompt";

    this._cardSet = [
      new cards.HashTableCard(),
      new cards.WhileCard(),
      new cards.WhileCard(),
      new cards.FunctionCard(),
      new cards.StackCard(),
      new cards.DoWhileCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ObjectCard(),
      new cards.ObjectCard(),
      new cards.ArrayCard(),
      new cards.ArrayCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Adding Machine",
      description:
        "Design a program that consumes a list of numbers and produces a list of the sums of each non-empty sublist separated by zeros. Ignore input elements that occur after the first occurrence of two consecutive zeros. You can assume that the first element will be non-zero and the input list is non-empty.",
      examples:
        "Given list = [7, 1, 0 ,3, 0, 13, 0, 0]\nReturn [8, 3, 13]\n\nGiven list = [1, 2, 0, 1, 0, 0]\nReturn [3, 1]"
    };

    this._tests = [
      {
        input: [[7, 1, 0, 3, 0, 13, 0, 0]],
        expected: [8, 3, 13]
      },
      {
        input: [[1, 2, 3, 0, 1, 2, 3, 0, 0]],
        expected: [6, 6]
      },
      {
        input: [[7, 0, 0, 13, 0]],
        expected: [7]
      },
      {
        input: [[-20, 20, 0, 10, 0, 1, 0, 0]],
        expected: [0, 10, 1]
      },
      {
        input: [[1, 0, -1, 1, 0, -4, 0, 0]],
        expected: [1, 0, -4]
      },
      {
        input: [[1, 0, 0]],
        expected: [1]
      },
      {
        input: [[1, 0, 9, 0, 0, 1, 2, 2, 0, 0]],
        expected: [1, 9]
      }
    ];

    this._testResults = [];
    this._testRunTimestampMS = Date.now();
  }
}

export default AddingMachinePrompt;
