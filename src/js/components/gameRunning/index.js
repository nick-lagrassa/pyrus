import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';

export default class GameRunning extends Component {
    getMe = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id === me.id) {
                return player;
            }
        }
    }

    getPartner = () => {
        const { players, me } = this.props;
        for (let player of players) {
            if (player.id !== me.id) {
                return player;
            }
        }
    }

    getPartnersHand = () => {
        return this.getPartner().hand;
    }

    getMyHand = () => {
        return this.getMe().hand;
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
                        className="absolute bottom--2 w-50 left-0 z-999 ph2 flex flex-column self-end"
                        cards={ this.getPartnersHand() }
                        title={ <p className="silver f6 mv2 pa2 br2 dib bg-pear-near-white self-end ba b--pear-light-gray">{ `${ this.getPartner().name }'s hand` }</p> }
                        align="flex-row-reverse"
                    />
                    <Hand
                        className="absolute bottom--2 w-50 right-0 z-999 ph2 flex flex-column"
                        cards={ this.getMyHand() }
                        title={ <p className="pear-near-white f6 mv2 pa2 br2 dib bg-pear-blue self-start ba b--pear-blue">{ `Your hand` }</p> }
                    />
                </div>
            </div>   
        );
    }
}
