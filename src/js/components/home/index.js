import React, { Component } from 'react';
import Game from '../game';
import { newGame } from '../../lib/api';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameTitle: '',
            gameId: '',
            gameReady: false
        };
    }

    handleGameTitleFormSubmit = e => {
        e.preventDefault();
        const { gameTitle } = this.state;

        if (!gameTitle) {
            return;
        }

        newGame(gameTitle)
            .then(({ gameId }) => {
                this.setState({
                    gameId,
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
            gameTitle: e.target.value
        });
    }

    handleGameIdChange = e => {
        this.setState({
            gameId: e.target.value
        });
    }

    render() {
        const { gameTitle, gameId, gameReady } = this.state;

        if (gameReady) {
            return <Redirect to={`/game/${ gameId }`}/>;
        }

        return (
            <div className="mw6 center mt6">
                <h1 className="tc f1 near-black">Pear</h1>
                <div>
                    <form
                        className="flex w-100 justify-between"
                        onSubmit={ this.handleGameTitleFormSubmit }
                    >
                        <select 
                            className="flex-auto ba br2 br--left b--pear-light-gray bg-pear-near-white pl3 input-reset" 
                            onChange={ this.handleGameTitleChange }
                        >
                            <option 
                                value="" 
                                selected
                                disabled
                                hidden
                            >
                                Select Challenge
                            </option>
                            <option
                                value="validParenthesesGame"
                            >
                                Valid Parentheses
                            </option>
                        </select>
                        <input
                            className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 br--right white pointer"
                            type="submit"
                            value="Start new game"
                        />
                    </form>
                </div>
                <div>
                    <form
                        className="flex w-100 justify-between"
                        onSubmit={ this.handleGameIdFormSubmit }
                    >
                        <input
                            className="flex-auto ba br2 br--left b--pear-light-gray bg-pear-near-white pl3"
                            type="text"
                            name="gameId"
                            value={ gameId }
                            onChange={ this.handleGameIdChange }
                            placeholder="Game ID"
                        />
                        <input
                            className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 br--right white pointer"
                            type="submit"
                            value="Join an existing game"
                        />
                    </form>
                </div>      
            </div>
        );
    }
}
