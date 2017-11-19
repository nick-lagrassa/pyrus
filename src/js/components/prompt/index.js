import React, { Component } from 'react';

export default class Prompt extends Component {
    render() {
        const { prompt, isWaitingForTestResults } = this.props;

        if (!prompt) {
            return null;
        }

        const numTestsPassed = prompt._testResults
            ? prompt._testResults.filter(result => result.passed).length
            : null;
        const shouldShowTests = !isWaitingForTestResults && prompt._testResults.length > 0;

        return (
            <div className="pa3 mb2 br2 bg-pear-near-white">
                <h1 className="f1">{ prompt._info.title }</h1>
                <p className="silver">Task</p>
                <p className="lh-copy">{ prompt._info.description }</p>
                <p className="silver">Examples</p>
                <pre className="lh-copy">{ prompt._info.examples }</pre>
                <div>
                    { isWaitingForTestResults &&
                        <div className="bg-pear-yellow mv pa3 br2">
                            <span className="b">🏃🏾 Running tests...</span>
                        </div>
                    }
                    { shouldShowTests &&
                        <div className="pv3 br2 bg-pear-near-white">
                            <p className="b">
                                { numTestsPassed === prompt._testResults.length ? '✅' : '⚠️'} { numTestsPassed } out of { prompt._testResults.length } tests passed!
                            </p>
                            { prompt._testResults.filter(result => !result.passed).map((result, i) => (
                                <div className="bg-pear-yellow mv2 pa3 br2" key={ i }>
                                    <p className="code lh-copy mv0">Input: { result.input }</p>
                                    <p className="code lh-copy mv0">Got: { JSON.stringify(result.output) }</p>
                                    <p className="code lh-copy mv0">Expected: { JSON.stringify(result.expected) }</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
