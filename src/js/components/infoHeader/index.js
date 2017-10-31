import React, { Component } from 'react';
import settings from '../../../../game/config/settings';

export default class InfoHeader extends Component {
    myTurn = () => {
        const { game, players, me } = this.props;
        return players[game.turnCount % players.length].id === me.id;
    }

    render() {
        const { game, players, me } = this.props;

        return (
            <div>
                { this.myTurn() ?
                    <pre>Your turn! You have { game.numMovesRemaining } moves remaining.</pre>
                    :
                    <pre>{ players[game.turnCount % players.length].name } has { game.numMovesRemaining } moves remaining.</pre>
                }
            </div>
        );
    }
}