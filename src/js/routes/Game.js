import React, { Component } from 'react';
import { newGame } from '../lib/api';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentWillMount() {
        newGame('validParenthesesGame')
            .then(body => this.setState({ ready: true, body }));
    }

    render() {
        const { ready, body } = this.state;

        if (!ready) {
            return <h1>loading...</h1>;
        }

        return (
            <div>
                { JSON.stringify(body) }
            </div>
        );
    }
}
