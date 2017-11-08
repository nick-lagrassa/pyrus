import React, { Component } from 'react';
import settings from '../../../../game/config/settings';
import { activePlayerIndex } from '../../../../game/util';

export default class InfoHeader extends Component {
    getActivePlayer = () => {
        const { players, game } = this.props;
        return players[activePlayerIndex(game.turnCount, players.length)];
    }

    myTurn = () => {
        const { me } = this.props;
        return this.getActivePlayer().id === me.id;
    }

    render() {
        const { game, deck } = this.props;
        const activePlayer = this.getActivePlayer();

        return (
            <div className={`h3 ${ this.myTurn() ? 'bg-pear-blue white' : 'bg-pear-light-gray' } flex justify-between items-center pa3`}>
                <span>{ `${ this.myTurn() ? 'Your' : `${ activePlayer.name }'s` } Turn` }</span>
                <span>{ `${ game.numMovesRemaining } Actions Remaining ` }</span>
                <span>{ `${ deck.cards.length } Cards Remaining in Deck` }</span>
            </div>
        );
    }
}