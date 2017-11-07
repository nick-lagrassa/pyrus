import React, { Component } from 'react';
import Card from '../card';
import { getGame } from '../../lib/api';

import { 
    GAME_STATUS_INIT,
    GAME_STATUS_RUNNING
} from '../../../../game/constants/game';
import GameInit from '../../containers/gameInit';
import GameRunning from '../../containers/gameRunning';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: ''
        };
    }

    handleRegisterPlayerSubmit = e => {
        e.preventDefault();
        const { playerName } = this.state;
    }

    handlePlayerNameChange = e => {
        this.setState({
            playerName: e.target.value
        });
    }

    render() {
        const { playerName } = this.state;
        const { game, me, gameId, stream } = this.props;

        switch (game.status) {
            case GAME_STATUS_INIT:
                return (
                    <GameInit
                        me={ me }
                        stream={ stream }
                    />
                );
            case GAME_STATUS_RUNNING:
                return (
                    <GameRunning
                        game={ game }
                        gameId={ gameId }
                        stream={ stream }
                    />
                );
            default:
                return <p>unrecognized game state</p>
        }
    }
}
