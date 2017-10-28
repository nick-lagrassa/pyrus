import React, { Component } from 'react';

export default class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { game } = this.props;

        return <pre>{ JSON.stringify(game, null, 2) }</pre>;
    }
}
