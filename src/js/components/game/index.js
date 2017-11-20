import React, { Component } from 'react';
import Card from '../card';
import { getGame } from '../../lib/api';

import { 
    GAME_STATUS_INIT,
    GAME_STATUS_RUNNING,
    GAME_STATUS_END
} from '../../../../game/constants/game';
import GameInit from '../../containers/gameInit';
import GameRunning from '../../containers/gameRunning';
import GameEnd from '../../containers/gameEnd';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: ''
        };
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
                        gameId={ gameId }
                        stream={ stream }
                    />
                );
            case GAME_STATUS_END:
                return (
                    <GameEnd
                        gameId={ gameId }
                        stream={ stream }
                    />
                );
            default:
                return <p>unrecognized game state</p>
        }
    }
}
