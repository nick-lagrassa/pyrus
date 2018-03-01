import _ from 'lodash';

export default class Prompt {
    // The Prompt class is abstract and should only ever be implemented
    // -> Prompt
    constructor() {
        if (new.target === Prompt) {
            throw new TypeError("Prompt is an abstract class.");
        }
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
