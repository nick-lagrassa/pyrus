import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Deck from '../../containers/deck';
import Board from '../../containers/board';
import Hand from '../hand';

export default class GameRunning extends Component {
    getPartnersHand = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id !== me.id) {
                return player.hand;
            }
        }

        return [];
    }

    getMyHand = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id === me.id) {
                return player.hand;
            }
        }

        return [];
    }

    render() {
        return (
            <div>
                <InfoHeader />
                <div>
                    <Board />
                </div>
                <div>
                    <div>
                        <Hand cards={ this.getPartnersHand() } />
                    </div>
                    <div>
                        <Deck />
                    </div>
                    <div>
                        <Hand cards={ this.getMyHand() } />
                    </div>
                </div>
            </div>   
        );
    }
}
