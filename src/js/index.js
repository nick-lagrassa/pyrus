import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import GameContainer from './containers/game';
import configureStore from '../../game/store/configureStore';
import { newGame } from './lib/api';

class GameProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
    }

    componentWillMount() {
        newGame('validParenthesesGame')
            .then(body => this.setState({ ready: true, body: JSON.parse(body) }))
            .catch(err => console.log(err));
    }

    render() {
        const { children } = this.props;
        const { ready, body } = this.state;

        if (!ready) {
            return <h1>loading...</h1>;
        }

        return (
            <Provider store={configureStore(body)}>
                { children }
            </Provider>
        );
    }
}

render(
    <GameProvider>
        <GameContainer />
    </GameProvider>,
    document.getElementById('app')
);
