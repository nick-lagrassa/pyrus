import _ from "lodash";

export default class Prompt {
  // The Prompt class is abstract and should only ever be implemented
  // -> Prompt
  constructor() {
    if (new.target === Prompt) {
      throw new TypeError("Prompt is an abstract class.");
    }
  }

  // returns the name of the function
  // -> String
  get name() {
    return this._name;
  }

  // returns the function signature
  // -> String
  get signature() {
    return this._signature;
  }

  // returns the test cases
  // -> List[{input: Object, expected: Object}]
  get tests() {
    return this._tests;
  }

  // returns the distribution of cards associated with this prompt
  // -> List[Card]
  get cardSet() {
    return this._cardSet;
  }

  // returns information about the challenge
  // -> {title: String, description: String, examples: String}
  get info() {
    return this._info;
  }

  // set the implementation of the challenge to be the given function
  // Function ->
  set implementation(fn) {
    this._fn = fn;
  }

  // evaluates whether the result of running someone's implementation of this
  // challenge matches our test case
  // Object, Object -> boolean
  equivalent(got, expected) {
    return _.isEqual(got, expected);
  }

  // format the input for better printing
  // Object -> String
  formatInput(input) {
    return JSON.stringify(input);
  }

  // format the output for better printing
  // Object -> String
  formatOutput(output) {
    return JSON.stringify(output);
  }
}
