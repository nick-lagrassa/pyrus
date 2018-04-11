import Prompt from "../../components/Prompt";
import cards from "../cards";

class IsPalindromePrompt extends Prompt {
  constructor() {
    super();
    this._name = "Is Palindrome";
    this._signature = "function isPalindromePrompt(str)";
    this._constructor = "IsPalindromePrompt";

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
      new cards.ArrayCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Is Palindrome",
      description:
        "A palindrome is a string with the same order of letters in forward and reverse order (ignore capitilization). Design a program that consumes a string and determines whether the string with all spaces and punctuation removed is a palindrome. Treat all non-alphanumeric characters as punctuation. Assume an empty string is a palindrome.",
      examples: "Given: `aba`\nReturn: true\n\nGiven: `abab`\nReturn: false"
    };

    this._tests = [
      {
        input: ["aba"],
        expected: true
      },
      {
        input: ["abab"],
        expected: false
      },
      {
        input: ["ab.b.a "],
        expected: true
      },
      {
        input: ["a"],
        expected: true
      },
      {
        input: [" RaceCar"],
        expected: true
      },
      {
        input: ["races car"],
        expected: false
      },
      {
        input: [""],
        expected: true
      }
    ];

    this._testResults = [];
    this._testRunTimestampMS = Date.now();
  }
}

export default IsPalindromePrompt;
