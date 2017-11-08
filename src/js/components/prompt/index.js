import React, { Component } from 'react';

export default class Prompt extends Component {
    render() {
        const { prompt } = this.props;

        if (!prompt) {
            return null;
        }

        return (
            <div className="pa3 br2 bg-pear-near-white h-100">
                <h1 className="f1">{ prompt._info.title }</h1>
                <p className="pear-light-gray">Task</p>
                <p className="lh-copy">{ prompt._info.description }</p>
                <p className="pear-light-gray">Examples</p>
                <pre className="lh-copy">{ prompt._info.examples }</pre>
            </div>
        );
    }
}
