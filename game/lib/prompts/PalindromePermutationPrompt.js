import Prompt from "../../components/Prompt";
import cards from "../cards";

class PalindromePermutationPrompt extends Prompt {
  constructor() {
    super();
    this._name = "Palindrome Permutation";
    this._signature = "function palindromePermutation(str)";
    this._constructor = "PalindromePermutationPrompt";

    this._cardSet = [
      new cards.HashTableCard(),
      new cards.HashTableCard(),
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
      new cards.ArrayCard(),
      new cards.ArrayCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Palindrome Permutation",
      description:
        "Given a string, write a function to check if it is a permutation of a palindrome (ignore captilization). A palindrome is a word or phrase that is same forwards and backwards. A permutation is a rearrangement of letters.",
      examples: "Given: `caCba`\nReturn: true\n\nGiven: `abybkayb`\nReturn: false"
    };

    this._tests = [
      {
        input: ["caCba"],
        expected: true
      },
      {
        input: ["abybkayb"],
        expected: false
      },
      {
        input: ["aa"],
        expected: true
      },
      {
        input: ["ab"],
        expected: false
      },
      {
        input: ["RacCaRrR"],
        expected: true
      },
      {
        input: ["iiiiiooooo"],
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

export default PalindromePermutationPrompt;
