import React, { Component } from 'react';

import Editor from '../editor';
import Prompt from '../prompt';

export default class Board extends Component {
    render() {
        const { gameId } = this.props;

        return (
            <div>
                <Prompt />
                <Editor gameId={ gameId } />
            </div>
        );
    }
}