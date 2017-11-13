import React, { Component } from 'react';
import { MOVE_DISCARD, MOVE_WRITE, MOVE_CONSUME } from '../../../../game/constants/move';

export default class Hand extends Component {
    handleDiscardClick = (card) => {
        const { stream } = this.props;
        console.log(card);
        stream.sendAction({
            type: MOVE_DISCARD,
            card
        });
    }

    render() {
        const { card } = this.props;

        return (
            <div className="w5 h5 ba b--pear-light-gray br2 pa3 bg-white rise">
                <div className="absolute fr">
                    <input
                        type="button"
                        className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 white pointer"
                        value="Discard"
                        onClick={ () => this.handleDiscardClick(card) }
                    />
                </div>
                <p className="f3 mt0">{ card.title }</p>
                <div className="bg-pear-near-white pa2 mv2">
                    <p className="f6 code mv0">{ card.implementation }</p>
                </div>
                <div className="bg-pear-near-white pa2">
                    <p className="f6 code mv0">{ card.example }</p>
                </div>
            </div>
        );
    }
}
