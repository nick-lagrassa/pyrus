import React, { Component } from 'react';

export default class Deck extends Component {
    render() {
        const { cards } = this.props;

        return <pre>{ cards.length } cards remaining.</pre>;
    }
}
