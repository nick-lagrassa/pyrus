import React, { Component } from 'react';

export default class Prompt extends Component {
    render() {
        const { prompt } = this.props;

        if (!prompt) {
            return null;
        }

        return (
            <div className="pa3 mb6 br2 bg-pear-near-white">
                <h1 className="f1">{ prompt._info.title }</h1>
                <p className="silver">Task</p>
                <p className="lh-copy">{ prompt._info.description }</p>
                <p className="silver">Examples</p>
                <pre className="lh-copy">{ prompt._info.examples }</pre>
            </div>
        );
    }
}
