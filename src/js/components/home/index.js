import React, { Component } from 'react';
import Game from '../game';
import { newGame } from '../../lib/api';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameTitle: 'validParenthesesGame',
            gameId: '',
            gameReady: false
        };
    }

    handleGameTitleFormSubmit = e => {
        e.preventDefault();
        const { gameTitle } = this.state;
        newGame(gameTitle)
            .then(({ gameId }) => {
                this.setState({
                    gameId: gameId,
                    gameReady: true
                });
            })
            .catch(err => console.log(err));
    }

    handleGameIdFormSubmit = e => {
        e.preventDefault();
        const { gameId } = this.state;
        this.setState({
            gameReady: true
        });
    }

    handleGameTitleChange = e => {
        this.setState({
            gameTitle: e.taget.value
        });
    }

    handleGameIdChange = e => {
        this.setState({
            gameId: e.target.id
        });
    }

    render() {
        const { gameTitle, gameId, gameReady } = this.state;

        if (gameReady) {
            return (
                <Redirect to={`/game/${ gameId }`}/>
            );
        }

        return (
            <div>
                <h1>Start a new game or join an existing one</h1>
                <div>
                    <form onSubmit={ this.handleGameTitleFormSubmit }>
                        <label>Start:</label>
                        <input
                            type="text"
                            name="gameTitle"
                            value={ gameTitle }
                            onChange={ this.handleGameTitleChange }
                        />
                        <input
                            type="submit"
                            value="Start new game"
                        />
                    </form>
                </div>
                <div>
                    <form onSubmit={ this.handleGameIdFormSubmit }>
                        <label>Join:</label>
                        <input
                            type="text"
                            name="gameId"
                            value={ gameId }
                            onChange={ this.handleGameIdChange }
                        />
                        <input
                            type="submit"
                            value="Join an existing game"
                        />
                    </form>
                </div>      
            </div>
        );
    }
}
