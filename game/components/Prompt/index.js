class Prompt {
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
        return got === expected;
    }

    // run the given inputs on the current implementation of the function
    // Object -> Object
    run(input) {
        return this._fn(input);
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

    // runs all test cases for this challenge
    // -> {
    //        pass: Integer, 
    //        total: Integer, 
    //        errors: List[{ input: Object, expected: Object, got: Object }]
    //    }
    runTests() {
        let results = {
            pass: 0,
            total: 0,
            errors: []
        };

        for (let t of this.tests) {
            // make a new copy of the input because some implementations might
            // modify memory in-place
            let result = this.run(JSON.parse(JSON.stringify(t.input)));
            if (!this.equivalent(result, t.expected)) {
                results.errors.push({
                    input: this.formatInput(t.input),
                    expected: this.formatOutput(t.expected),
                    got: JSON.stringify(result)
                });
            } else {
                results.pass++;
            }
            results.total++;
        }

        return results;
    }
}

export default Prompt;