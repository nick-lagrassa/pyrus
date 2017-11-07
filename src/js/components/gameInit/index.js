import React, { Component } from 'react';
import Card from '../card';
import { getGame } from '../../lib/api';
import settings from '../../../../game/config/settings';
import { PLAYERS_REGISTER_PLAYER } from '../../../../game/constants/players';

export default class gameInit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
        };
    }

    handleRegisterPlayerSubmit = e => {
        e.preventDefault();
        const { playerName } = this.state;
        const { stream } = this.props;

        stream.sendAction({
            type: PLAYERS_REGISTER_PLAYER,
            name: playerName
        });
    }

    handlePlayerNameChange = e => {
        this.setState({
            playerName: e.target.value
        });
    }

    meInGame = () => {
        const { players, me } = this.props;
        return players.filter(player => player.id === me.id).length > 0;
    }

    render() {
        const { players, me } = this.props;
        const { playerName } = this.state;

        let form;
        if (players.length >= settings.MAX_PLAYERS_PER_GAME) {
            form = <p>The game has reached its capacity. You can't sign up right now.</p>;
        } else if (me.name && me.id) {
            form = <p>You're already registered</p>;
        } else {
            form = (
                <form onSubmit={ this.handleRegisterPlayerSubmit }>
                    <label>Player name</label>
                    <input
                        type="text"  
                        onChange={ this.handlePlayerNameChange }
                        value={ playerName }
                    />
                    <input type="submit" />
                </form>
            );
        }

        return (
            <div>
                <div>
                    <h1>New Game</h1>
                </div>
                <div>
                    <p>Players in game</p>
                    { players.map((player, i) => 
                        <div key={ i }>
                            <p>{ player.name }</p>
                        </div>
                    )}
                </div>
                { !this.meInGame() && form }
                { players.length === settings.MAX_PLAYERS_PER_GAME && this.meInGame() &&
                    <button>
                        Start Game
                    </button>
                }
            </div>
        );
    }
}
