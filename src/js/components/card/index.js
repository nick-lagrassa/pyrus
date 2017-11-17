import React, { Component } from 'react';
import { MOVE_DISCARD, MOVE_WRITE, MOVE_CONSUME } from '../../../../game/constants/move';

export default class Hand extends Component {
    render() {
        const { card, handleCardClick, style } = this.props;

        return (
            <div
                className="w5 min-h5 ba b--pear-light-gray br2 pa3 bg-white rise pointer flex-none absolute"
                onClick={ handleCardClick ? () => handleCardClick(card) : () => {} }
                style={ style }
            >
                <p className="f3 mt0">{ card.title }</p>
                <div className="bg-pear-near-white pa2 mv2">
                    <pre className="f6 code mv0 pre">{ card.implementation }</pre>
                </div>
                <div className="bg-pear-near-white pa2">
                    <pre className="f6 code mv0 pre">{ card.example }</pre>
                </div>
            </div>
        );
    }
}
