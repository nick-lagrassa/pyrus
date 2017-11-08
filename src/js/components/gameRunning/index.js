import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
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
            <div className="flex flex-column vh-100 relative overflow-hidden">
                <InfoHeader />
                <div className="flex mw9 center">
                    <div className="w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll">
                        <Prompt />
                    </div>
                    <div className="w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll">
                        <Editor gameId={ gameId } />
                    </div>
                </div>
                <div>
                    <Hand
                        className="absolute bottom--2 flex w-50 left-0"
                        cards={ this.getPartnersHand() }
                    />
                    <Hand
                        className="absolute bottom--2 flex w-50 right-0"
                        cards={ this.getMyHand() }
                    />
                </div>
            </div>   
        );
    }
}
