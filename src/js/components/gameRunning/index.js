import React, { Component } from 'react';

import RulesEnforcer from '../../../../game/components/RulesEnforcer';
import DiscardMove from '../../../../game/components/DiscardMove';
import WriteMove from '../../../../game/components/WriteMove';
import ConsumeMove from '../../../../game/components/ConsumeMove';
import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';
import { myTurn } from '../../../../game/util';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../../../game/constants/move';
import { GAME_END_TURN, GAME_END } from '../../../../game/constants/game';
import { COMMAND_RUN_CODE } from '../../../../app/constants/command';

export default class GameRunning extends Component {
    constructor(props) {
        super(props);
        this.re = new RulesEnforcer();
        this.state = {
            isWaitingForTestResults: false,
            shouldDisplaySubmitModal: false,
            shouldDisplayTestResultsIndicator: false
        };
    }

    componentWillUpdate(nextProps, nextState) {
        const { isWaitingForTestResults } = this.state;
        const { prompt } = this.props;
        if (isWaitingForTestResults && prompt._testRunTimestampMS !== nextProps.prompt._testRunTimestampMS) {
            this.setState({ isWaitingForTestResults: false });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isWaitingForTestResults } = this.state;
        if (!isWaitingForTestResults && prevState.isWaitingForTestResults) {
            this.setState({ shouldDisplayTestResultsIndicator: true });
        }
    }

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

    handleRunCodeClick = () => {
        const { prompt, stream } = this.props;
        stream.sendCommand({
            type: COMMAND_RUN_CODE,
            fn: `(${ prompt._signature }{${ this.editorElement.doc.getValue() + '\n' }})`,
            tests: prompt._tests
        });

        this.setState({
            isWaitingForTestResults: true,
            shouldDisplayTestResultsIndicator: false
        });
    }

    handleSubmitCodeClick = () => {
        this.setState({
            shouldDisplaySubmitModal: true
        });
    }

    handleConfirmSubmitCodeClick = () => {
        const { stream } = this.props;
        stream.sendAction({
            type: GAME_END,
            code: this.editorElement.doc.getValue()
        });
    }

    render() {
        const { me, game, gameId, stream, players } = this.props;
        const {
            isWaitingForTestResults,
            shouldDisplaySubmitModal,
            shouldDisplayTestResultsIndicator
        } = this.state;

        return (
            <div className="flex flex-column vh-100 relative overflow-hidden">
                { shouldDisplaySubmitModal &&
                    <div className="absolute absolute--fill z-9999">
                        <div className="absolute absolute--fill bg-near-black o-60"></div>
                        <div className="mw6 mt6 bg-pear-near-white br2 pa4 relative center">
                            <h2 className="mv0">You won't be able to make changes after submitting. Are you sure you want to proceed?</h2>
                            <div className="flex justify-around mt3">
                                <input
                                    type="button"
                                    className="db w4 input-reset ba bg-red b--red pa3 br2 near-white pointer"
                                    value="Yes"
                                    onClick={ this.handleConfirmSubmitCodeClick }
                                />
                                <input
                                    type="button"
                                    className="db w4 input-reset ba bg-pear-near-white b--pear-light-gray pa3 br2 silver pointer mr2"
                                    value="No"
                                    onClick={ () => this.setState({ shouldDisplaySubmitModal: false }) }
                                />
                            </div>
                        </div>
                    </div>
                }
                <div className="flex mw8 center">
                    <div
                        className="w-50 pt3 ph3 pb7 overflow-scroll relative"
                        onScroll={ () => this.setState({ shouldDisplayTestResultsIndicator: false }) }
                    >
                        <Prompt isWaitingForTestResults={ isWaitingForTestResults } />
                        { shouldDisplayTestResultsIndicator &&
                            <div className="absolute top-2 right-2 pa3 bg-pear-yellow br2">👇 New test results!</div>
                        }
                    </div>
                    <div 
                        className="w-50 pt3 ph3 pb7 overflow-scroll relative"
                    >
                        <Editor
                            gameId={ gameId }
                            getEditor={ editor => this.editorElement = editor }
                        />
                    </div>
                    <div className="absolute right--2 top-3 slide-left-3 flex flex-column z-999">
                        <div className="flex flex-column">
                            <p className="f6 silver mt4 mb0">RUN</p>
                            <input
                                type="button"
                                className="db mv1 input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer slide-left-1"
                                value="Run Code"
                                onClick={ this.handleRunCodeClick }
                            />
                            <input
                                type="button"
                                className={`db mv1 input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer slide-left-1`}
                                value="Submit Code"
                                onClick={ this.handleSubmitCodeClick }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
