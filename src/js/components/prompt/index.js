import React, { Component } from 'react';

export default class Prompt extends Component {
    render() {
        const { prompt } = this.props;
        const numTestsPassed = prompt._testResults
            ? prompt._testResults.filter(result => result.passed).length
            : null;

        if (!prompt) {
            return null;
        }

        return (
            <div className="pa3 mb2 br2 bg-pear-near-white">
                <h1 className="f1">{ prompt._info.title }</h1>
                <p className="silver">Task</p>
                <p className="lh-copy">{ prompt._info.description }</p>
                <p className="silver">Examples</p>
                <pre className="lh-copy">{ prompt._info.examples }</pre>
                { prompt._testResults.length &&
                    <div className="pa3 br2 bg-pear-near-white">
                        <p className="b">
                            { numTestsPassed === prompt._testResults.length ? '✅' : '⚠️'} { numTestsPassed } out of { prompt._testResults.length } tests passed!
                        </p>
                        { prompt._testResults.filter(result => !result.passed).map((result, i) => (
                            <div className="bg-pear-yellow mv2 pa3 br2" key={ i }>
                                <p className="code lh-copy mv0">Input: { JSON.stringify(result.input).replace(this.bracketsRe, '') }</p>
                                <p className="code lh-copy mv0">Got: { JSON.stringify(result.output) }</p>
                                <p className="code lh-copy mv0">Expected: { JSON.stringify(result.expected) }</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        );
    }
}
