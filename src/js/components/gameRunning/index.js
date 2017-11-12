import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';

import limitEval from '../../util/limitEval';

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

    handleRunCode = () => {
        const { prompt } = this.props;

        for (let test of prompt._tests) {
            const fn = `(${ prompt._signature }{${ this.editorElement.doc.getValue() + '\n' }})("${ test.input }")`
            limitEval(fn, (done, val) => {
                if (!done) {
                    console.log('Your code timed out.');
                }

                if (val === test.expected) {
                    console.log('test passed');
                } else {
                    console.log('test failed');
                }
            });
        }
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
                        <Editor
                            gameId={ gameId }
                            getEditor={ editor => this.editorElement = editor }
                        />
                    </div>
                </div>
                <div>
                    <div className="absolute bottom--2 w-50 left-0 z-999 ph2 flex flex-column self-end">
                        <p className="silver f6 mv2 pa2 br2 dib bg-pear-near-white self-end ba b--pear-light-gray">{ `${ this.getPartner().name }'s hand` }</p>
                        <div className="flex flex-row-reverse">
                            <Hand cards={ this.getPartnersHand() } />
                        </div>
                    </div>
                    <div className="absolute bottom--2 w-50 right-0 z-999 ph2 flex flex-column">
                        <div className="flex justify-between">
                            <p className="pear-near-white f6 mv2 pa2 br2 dib bg-pear-blue self-start ba b--pear-blue">Your hand</p>
                            <input
                                type="button"
                                className="input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer"
                                value="Run Code"
                                onClick={ this.handleRunCode }
                            />
                        </div>
                        <div className="flex">
                            <Hand cards={ this.getMyHand() } />
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}
