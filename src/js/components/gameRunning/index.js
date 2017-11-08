import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';

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
        const { gameId } = this.props;

        return (
            <div className="flex flex-column">
                <InfoHeader />
                <div className="flex mw9 center">
                    <div className="w-50 pa3">
                        <Prompt />
                    </div>
                    <div className="w-50 pa3">
                        <Editor gameId={ gameId } />
                    </div>
                </div>
                <div className="flex">
                    <Hand cards={ this.getPartnersHand() } />
                    <Hand cards={ this.getMyHand() } />
                </div>
            </div>   
        );
    }
}
