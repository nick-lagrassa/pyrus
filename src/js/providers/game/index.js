import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { getGame } from '../../lib/api';
import configureStore from '../../store/configureStore';
import Game from '../../containers/game';

export default class GameProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialState: null
        };
    }

    componentWillMount() {
        const { gameId } = this.props.match.params;
        getGame(gameId)
            .then(initialState => { this.setState({ initialState }) })
            .catch(err => console.log(err));
    }

    render() {
        const { initialState } = this.state;

        if (initialState === null) {
            return <h1>loading</h1>
        }

        return (
            <Provider store={ configureStore(initialState) }>
                <Game />
            </Provider>
        );
    }
}
