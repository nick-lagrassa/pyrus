import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

import { getGame } from '../../lib/api';
import configureStore from '../../store/configureStore';
import Game from '../../containers/game';

export default class GameProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: null,
            err: null
        };
    }

    componentWillMount() {
        const { gameId } = this.props.match.params;
        getGame(gameId)
            .then(initialState => this.setState({ initialState }) )
            .catch(err => this.setState({ err }));
    }

    render() {
        const { initialState, err } = this.state;

        if (initialState === null) {
            return <h1>loading</h1>;
        }

        if (err) {
            return (
                <div>
                    <p>Oops! Something went wrong and we can't fetch that game. Make sure you have the right url and try again.</p>
                    <Link to="/">Go back</Link>
                </div>
            );
        }

        return (
            <Provider store={ configureStore(initialState) }>
                <Game />
            </Provider>
        );
    }
}
