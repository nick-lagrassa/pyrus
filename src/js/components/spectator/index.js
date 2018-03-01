import React, { Component } from 'react';

import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';
import { GAME_STATUS_RUNNING } from '../../../../game/constants/game'

export default class GameRunning extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isWaitingForTestResults: false,
            shouldDisplayTestResultsIndicator: false,
        }
        this.state = this.initialState;
    }

    componentWillUpdate(nextProps, nextState) {
        const { isWaitingForTestResults } = this.state;
        const { prompt, game } = this.props;
        if (isWaitingForTestResults && (prompt.exampleTestResults.length === 0 || prompt.testResults.length === 0)) {
            this.setState({ isWaitingForTestResults: false });
        }

        if (nextProps.game.gameResetTimestampMS !== game.gameResetTimestampMS) {
            this.setState({ ...this.initialState });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { isWaitingForTestResults } = this.state;
        if (!isWaitingForTestResults && prevState.isWaitingForTestResults) {
            this.setState({ shouldDisplayTestResultsIndicator: true });
        }
    }

    getPartner = (i=0) => {
        const { players, me } = this.props;
        return players[i];
    }

    getPartnersHand = (id=0) => {
        return this.getPartner(id).hand;
    }

    render() {
        const { me, game, gameId, stream, players } = this.props;
        const {
            isWaitingForTestResults,
            shouldDisplayTestResultsIndicator,
        } = this.state;

        if (game.status !== GAME_STATUS_RUNNING) {
            return <div>waiting for game to start</div>;
        }

        return (
            <div className="flex flex-column vh-100 relative overflow-hidden">
                <InfoHeader />
                <div className="flex mw8 center">
                    <div
                        className="w-50 pt3 ph3 mb7 overflow-scroll relative"
                        onScroll={ () => this.setState({ shouldDisplayTestResultsIndicator: false }) }
                    >
                        <Prompt isWaitingForTestResults={ isWaitingForTestResults } />
                        { shouldDisplayTestResultsIndicator &&
                            <div className="absolute top-2 right-2 pa3 bg-pear-yellow br2">👇 New test results!</div>
                        }
                    </div>
                    <div className={`w-50 pt3 ph3 pb7 overflow-scroll relative not-allowed`} >
                        <Editor
                            gameId={ gameId }
                            isMoveCancelled={ false }
                            getEditor={ editor => this.editorElement = editor }
                            handleEditorChange={ () => {} }
                            resetIsMoveCancelled={ () => {} }
                            enabled={ false }
                        />
                    </div>
                </div>
                <div>
                    <div
                        className="absolute bottom-5 w-50 left-0 z-9 ph2 flex flex-column self-end"
                        ref={ e => this.partnersHandContainerElement = e }
                    >
                        <p className="silver f6 mv2 pa2 br2 dib bg-pear-near-white self-end ba b--pear-light-gray">{ `${ this.getPartner(0).name }'s hand` }</p>
                        <div className="flex-none relative">
                            <Hand
                                cards={ this.getPartnersHand(0) }
                                inverse
                                handContainer={ this.partnersHandContainerElement }
                            />
                        </div>
                    </div>
                    <div
                        className={`absolute bottom-5 w-50 right-0 ph2 flex flex-column z-99'}`}
                        ref={ e => this.myHandContainerElement = e }
                    >
                        <p className="pear-near-white f6 mv2 pa2 br2 dib bg-pear-blue self-start ba b--pear-blue z-999">{ `${ this.getPartner(1).name }'s hand` }</p>
                        <div className="flex-none relative">
                            <Hand
                                cards={ this.getPartnersHand(1) }
                                handContainer={ this.myHandContainerElement }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
