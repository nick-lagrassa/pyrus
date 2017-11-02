import React, { Component } from 'react';
import settings from '../../../../game/config/settings';
import { activePlayerIndex } from '../../../../game/util';

export default class InfoHeader extends Component {
    render() {
        const { game, players, me } = this.props;
        const activePlayer = players[activePlayerIndex(game.turnCount, players.length)];

        return (
            <div>
                { activePlayer.id === me.id ?
                    <pre>Your turn! You have { game.numMovesRemaining } moves remaining.</pre>
                    :
                    <pre>{ activePlayer.name } has { game.numMovesRemaining } moves remaining.</pre>
                }
            </div>
        );
    }
}