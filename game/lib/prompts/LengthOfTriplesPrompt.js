import Prompt from "../../components/Prompt";
import cards from "../cards";

class LengthOfTriplesPrompt extends Prompt {
  constructor() {
    super();
    this._name = "Length of Triples";
    this._signature = "function lengthOfTriples(list)";
    this._constructor = "LengthOfTriplesPrompt";

    this._cardSet = [
      new cards.HashTableCard(),
      new cards.WhileCard(),
      new cards.FunctionCard(),
      new cards.StackCard(),
      new cards.DoWhileCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ConditionalCard(),
      new cards.ObjectCard(),
      new cards.ObjectCard(),
      new cards.ArrayCard(),
      new cards.ArrayCard(),
      new cards.ForCard(),
      new cards.ForCard(),
      new cards.SwitchCard()
    ];

    this._info = {
      title: "Length of Triples",
      description:
        "Design a program that consumes a list of strings and produces the length of the longest concatenation of three consecutive elements. Assume the input contains at least three strings.",
      examples:
        'Given list = ["a","ab","aba","a","a"]\nReturn 6\n\nGiven list = ["abra","cadab","r","aabra","a"]\nReturn 11'
    };

    this._tests = [
      {
        input: [["a", "ab", "aba", "a", "a"]],
        expected: 6
      },
      {
        input: [["abra", "cadab", "r", "aabra", "a"]],
        expected: 11
      },
      {
        input: [["a", "ab", "aba", "ba", "a"]],
        expected: 7
      },
      {
        input: [["abcba", "ab", "aba", "ab", "abccba"]],
        expected: 11
      },
      {
        input: [["", "", "", "", "a"]],
        expected: 1
      },
      {
        input: [["", "", "", "", ""]],
        expected: 0
      },
      {
        input: [["aa", "a", "aabccbaa", "ab", "aba", "aabcbaa", "a"]],
        expected: 13
      }
    ];

    this._testResults = [];
    this._testRunTimestampMS = Date.now();
  }
}

export default LengthOfTriplesPrompt;
