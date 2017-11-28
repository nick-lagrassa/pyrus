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
            gameReady: false,
            shouldDisplaySpectatorViewInput: false,
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

    handleKeyDown = e => {
        if (e.keyCode === 27) {
            const { shouldDisplaySpectatorViewInput } = this.state;
            this.setState({ shouldDisplaySpectatorViewInput: !shouldDisplaySpectatorViewInput });
        }
    }

    render() {
        const { gameTitle, gameId, gameReady, shouldDisplaySpectatorViewInput } = this.state;

        if (gameReady) {
            if (shouldDisplaySpectatorViewInput) {
                return <Redirect to={`/spectator/${ gameId }`}/>;
            }

            return <Redirect to={`/challenge/${ gameId }`}/>;
        }

        return (
            <div className="mw6 center mt6">
                <h1 className="tc f1 near-black">Collaborative Programming</h1>
                <div>
                    <form
                        className="flex w-100 justify-between"
                        onSubmit={ this.handleGameTitleFormSubmit }
                    >
                        <select
                            className="flex-auto ba br2 br--left b--pear-light-gray bg-pear-near-white pl3 input-reset lh-copy"
                            onChange={ this.handleGameTitleChange }
                            defaultValue=""
                        >
                            <option value="" disabled >
                                Select Challenge ⬇️
                            </option>
                            <option value="arrayTwoSumGame" >
                                Example Prompt
                            </option>
                            <option value="averagePassingScoreGame" >
                                Another Example
                            </option>
                        </select>
                        <input
                            className="input-reset ba bg-pear-blue b--pear-blue pa3 br2 br--right white pointer"
                            type="submit"
                            value="Start new challenge"
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
                            onKeyDown={ this.handleKeyDown }
                            placeholder="Challenge ID"
                        />
                        <input
                            className={`input-reset ba ${ shouldDisplaySpectatorViewInput ? 'bg-pear-green b--pear-green' : 'bg-pear-blue b--pear-blue' } pa3 br2 br--right white pointer`}
                            type="submit"
                            value={ shouldDisplaySpectatorViewInput ? 'Enter spectator view' : 'Join an existing challenge'}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
