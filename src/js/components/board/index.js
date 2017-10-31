import React, { Component } from 'react';

import Editor from '../editor';
import Prompt from '../prompt';

export default class Board extends Component {
    render() {
        return (
            <div>
                <Prompt />
                <Editor />
            </div>
        );
    }
}