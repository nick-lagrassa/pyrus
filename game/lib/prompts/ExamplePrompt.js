import Prompt from "../../components/Prompt";
import cards from "../cards";

class ExamplePrompt extends Prompt {
  constructor() {
    super();
    this._name = "Double List";
    this._signature = "function doubleList(arr)";
    this._constructor = "ExamplePrompt";

    this._cardSet = [
      new cards.HashTableCard(),
      new cards.HashTableCard(),
      new cards.WhileCard(),
      new cards.FunctionCard(),
      new cards.FunctionCard(),
      new cards.FunctionCard(),
      new cards.StackCard(),
      new cards.DoWhileCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Double List",
      description:
        "Given a non-empty array of numbers, return a new list which contains every element in the input list doubled.",
      examples: "Given arr = [2, 6, 42]\nReturn [4, 12, 84]."
    };

    this._tests = [
      {
        input: [[2, 6, 42]],
        expected: [4, 12, 84]
      },
      {
        input: [[-10, 3, 0, 10]],
        expected: [-20, 6, 0, 20]
      }
    ];

    this._testResults = [];
  }
}

export default ExamplePrompt;
