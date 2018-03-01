import React, { Component } from 'react';

export default class Prompt extends Component {
    render() {
        const { prompt, isWaitingForTestResults } = this.props;

        if (!prompt) {
            return null;
        }

        const numTestsPassed = prompt.testResults
            ? prompt.testResults.filter(result => result.passed).length
            : null;
        const numExampleTestsPassed = prompt.exampleTestResults
            ? prompt.exampleTestResults.filter(result => result.passed).length
            : null;
        const shouldShowTests = !isWaitingForTestResults && prompt.testResults.length > 0;
        const shouldShowExampleTests = !isWaitingForTestResults && prompt.exampleTestResults.length > 0;

        return (
            <div className="pa3 mb2 br2 bg-pear-near-white">
                <h1 className="f1">{ prompt.info.title }</h1>
                <p className="silver">Task</p>
                <p className="lh-copy">{ prompt.info.description }</p>
                <p className="silver">Examples</p>
                <pre className="lh-copy overflow-x-scroll">{ prompt.info.examples }</pre>
                <div>
                    { isWaitingForTestResults &&
                        <div className="bg-pear-yellow mv pa3 br2">
                            <span className="b">🏃🏾 Running tests...</span>
                        </div>
                    }
                    { shouldShowTests &&
                        <div className={`${ numTestsPassed === prompt.testResults.length ? 'bg-pear-green' : 'bg-pear-yellow'} mv2 ph3 pv2 br2`}>
                            <p className="b">
                                { numTestsPassed === prompt.testResults.length ? '✅' : '⚠️'} { numTestsPassed } out of { prompt.testResults.length } tests passed!
                            </p>
                        </div>
                    }
                    { shouldShowExampleTests &&
                        <div>
                            <div className={`${ numExampleTestsPassed === prompt.exampleTestResults.length ? 'bg-pear-green' : 'bg-pear-yellow'} mv2 ph3 pv2 br2`}>
                                <p className="b">
                                    { numExampleTestsPassed === prompt.exampleTestResults.length ? '✅' : '⚠️'} { numExampleTestsPassed } out of { prompt.exampleTestResults.length } example cases passed!
                                </p>
                            </div>
                            { prompt.exampleTestResults.filter(result => !result.passed).map((result, i) => {
                                    const shouldDisplayConsole = result.console && result.console.length > 0;
                                    return (
                                        <div className="bg-pear-yellow mv2 pa3 br2" key={ i }>
                                            <p className="code lh-copy mv0">Input: { result.input }</p>
                                            <p className="code lh-copy mv0">Got: { JSON.stringify(result.output) }</p>
                                            <p className="code lh-copy mv0">Expected: { JSON.stringify(result.expected) }</p>
                                            { shouldDisplayConsole && [
                                                <p
                                                    key="console-label"
                                                    className="code lh-copy mv0"
                                                >
                                                    Console:
                                                </p>,
                                                <div
                                                    key="console-logs"
                                                    className="bg-pear-near-white pa2 br2"
                                                >
                                                    { result.console.map((log, i) => (
                                                        <pre className="mv0 lh-copy" key={ i }>{ log }</pre>
                                                    ))}
                                                </div>
                                            ]}
                                        </div>
                                    )
                            })}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
