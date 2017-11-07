import React, { Component } from 'react';
import Card from '../card';
import { getGame } from '../../lib/api';
import settings from '../../../../game/config/settings';
import { PLAYERS_REGISTER_PLAYER } from '../../../../game/constants/players';
import { GAME_START } from '../../../../game/constants/game';

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

    handleGameStartSubmit = e => {
        e.preventDefault();
        const { stream } = this.props;
        
        stream.sendAction({
            type: GAME_START
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
            form = <p className="tc">The game has reached capacity. You can't sign up right now.</p>;
        } else {
            form = (
                <form
                    className="flex w-100 justify-between"
                    onSubmit={ this.handleRegisterPlayerSubmit }
                >
                    <input
                        className="flex-auto ba br2 br--left b--pear-light-gray bg-pear-near-white pl3"
                        type="text"  
                        onChange={ this.handlePlayerNameChange }
                        value={ playerName }
                        placeholder="Name"
                    />
                    <input
                        className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 br--right white pointer"
                        value="Join Game"
                        type="submit"
                    />
                </form>
            );
        }

        let lobby = [];

        for (let i = 0; i < settings.MAX_PLAYERS_PER_GAME; i++) {
            if (players[i] !== undefined) {
                lobby.push(
                    <div
                        className="w4 h4 bg-pear-purple br2 ma2 flex flex-column justify-center align-center"
                        key={ i }
                    >
                        <p className="white tc">{ players[i].name }</p>
                    </div>
                );
            } else {
                lobby.push(
                    <div
                        className="w4 h4 b--pear-light-gray br2 ma2 ba flex flex-column justify-center align-center"
                        key={ i }
                    >
                        <p className="pear-light-gray tc">Waiting for player...</p>
                    </div>
                );
            }
        }

        return (
            <div className="mw6 center mt6">
                <h1 className="tc f1 near-black">New Game</h1>
                <div className="mb4">
                    <p className="tc">
                        {`${ players.length }/${ settings.MAX_PLAYERS_PER_GAME } Players Registered`}
                    </p>
                    <div className="flex justify-center">
                        { lobby }
                    </div>
                </div>
                { !this.meInGame() && form }
                { players.length === settings.MAX_PLAYERS_PER_GAME && this.meInGame() &&
                    <form 
                        className="flex justify-center"
                        onSubmit={ this.handleGameStartSubmit }
                    >
                        <input
                            type="submit"
                            className="input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer"
                            value="Start Game"
                        />
                    </form>
                }
            </div>
        );
    }
}
