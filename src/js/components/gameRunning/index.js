import React, { Component } from 'react';

import RulesEnforcer from '../../../../game/components/RulesEnforcer';
import DiscardMove from '../../../../game/components/DiscardMove';
import WriteMove from '../../../../game/components/WriteMove';
import ConsumeMove from '../../../../game/components/ConsumeMove';
import InfoHeader from '../../containers/infoHeader';
import Editor from '../../containers/editor';
import Hand from '../hand';
import Prompt from '../../containers/prompt';
import limitEval from '../../util/limitEval';
import { myTurn } from '../../../../game/util';
import { MOVE_DISCARD, MOVE_CONSUME, MOVE_WRITE } from '../../../../game/constants/move';
import { COMMAND_RUN_CODE } from '../../../../app/constants/command';

export default class GameRunning extends Component {
    constructor(props) {
        super(props);
        this.re = new RulesEnforcer();
        this.state = {
            isWaitingForSubmit: false,
            isMoveValid: false,
            selectedMove: null,
            selectedCard: null,
        };
    }

    shouldDisplayOverlay = () => {
        const { isWaitingForSubmit, selectedMove } = this.state;
        return !isWaitingForSubmit && (selectedMove === MOVE_DISCARD || selectedMove === MOVE_CONSUME);
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

    getMyHand = () => {
        return this.getMe().hand;
    }

    handleRunCode = () => {
        const { prompt, stream } = this.props;
        stream.sendCommand({
            type: COMMAND_RUN_CODE,
            fn: `(${ prompt._signature }{${ this.editorElement.doc.getValue() + '\n' }})`,
            tests: prompt._tests
        });
    }

    handleDiscardMoveClick = () => {
        this.setState({
            selectedMove: MOVE_DISCARD
        });
    }

    handleConsumeMoveClick = () => {
        this.setState({
            selectedMove: MOVE_CONSUME,
            isWaitingForSubmit: true,
            isMoveValid: false
        });
    }

    handleWriteMoveClick = () => {
        this.setState({
            selectedMove: MOVE_WRITE,
            isWaitingForSubmit: true,
            isMoveValid: false
        });
    }

    handleCardClick = card => {
        const { stream, me } = this.props;
        const { selectedMove } = this.state;

        if (selectedMove === MOVE_DISCARD) {
            stream.sendAction({
                type: selectedMove,
                move: new DiscardMove(me.id, card)
            });

            this.setState({
                selectedMove: null
            });
            return;
        }

        this.setState({
            isWaitingForSubmit: true,
            selectedCard: card
        });
    }

    handleCancelAction = () => {
        this.setState({
            selectedMove: null,
            isWaitingForSubmit: false,
            selectedCard: null
        });
    }

    handleSubmitActionClick = () => {
        const { stream, me } = this.props;
        const { selectedMove, isWaitingForSubmit, selectedCard } = this.state;
        const code = this.editorElement.doc.getValue()
        switch (selectedMove) {
            case MOVE_CONSUME:
                stream.sendAction({
                    type: selectedMove,
                    move: new ConsumeMove(me.id, selectedCard, code)
                });
                break;
            case MOVE_WRITE:
                stream.sendAction({
                    type: selectedMove,
                    move: new WriteMove(me.id, code)
                });
                break;
            default:
                return;
        }

        this.setState({
            selectedMove: null,
            isWaitingForSubmit: false,
            selectedCard: null
        });
    }

    handleEditorChange = () => {
        const { me, board, players, deck } = this.props;
        const { isMoveValid, selectedMove, selectedCard } = this.state;

        let code = this.editorElement.doc.getValue();
        let move;
        switch (selectedMove) {
            case MOVE_WRITE:
                move = new WriteMove(me.id, code);
                break;
            case MOVE_CONSUME:
                move = new ConsumeMove(me.id, selectedCard, code);
                break;
            default:
                return;
        }

        this.setState({ isMoveValid: this.re.isLegalMove(board, move, deck, players) });
    }

    render() {
        const { me, game, gameId, stream, players } = this.props;
        const { testResults, selectedMove, isWaitingForSubmit, isMoveValid } = this.state;

        return (
            <div className="flex flex-column vh-100 relative overflow-hidden">
                <InfoHeader />
                <div className="flex mw8 center mb6">
                    <div className="w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll">
                        <Prompt />
                    </div>
                    <div className={`w-50 pt3 ph3 pb6 aspect-ratio-object overflow-scroll ${ myTurn(me, game, players) ? '' : 'not-allowed' }`}>
                        <Editor
                            className={ myTurn(me, game, players) ? '' : 'pointer-none' }
                            gameId={ gameId }
                            getEditor={ editor => this.editorElement = editor }
                            handleEditorChange={ this.handleEditorChange }
                        />
                    </div>
                    <div className="absolute right--2 top-3 slide-left-3 flex flex-column">
                        { myTurn(me, game, players) && isWaitingForSubmit &&
                            <div className="flex flex-column">
                                <p className="f6 silver mv0">SUBMIT ACTION</p>
                                <input
                                    type="button"
                                    className={`db mv1 input-reset ba bg-pear-blue b--pear-blue pa3 br2 white pointer slide-left-1 ${ isMoveValid ? '' : 'pointer-none o-30' }`}
                                    value="Submit Action"
                                    onClick={ this.handleSubmitActionClick }
                                />
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-red b--red pa3 br2 near-white pointer slide-left-1"
                                    value="Cancel Action"
                                    onClick={ this.handleCancelAction }
                                />
                            </div>
                        }
                        { myTurn(me, game, players) && !isWaitingForSubmit &&
                            <div className="flex flex-column">
                                <p className="f6 silver mv0">ACTIONS</p>
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-blue b--pear-blue pa3 br2 white pointer slide-left-1"
                                    value="Write Code"
                                    onClick={ this.handleWriteMoveClick }
                                />
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-purple b--pear-purple pa3 br2 white pointer slide-left-1"
                                    value="Consume Card"
                                    onClick={ this.handleConsumeMoveClick }
                                />
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-pear-yellow b--pear-yellow pa3 br2 near-black pointer slide-left-1"
                                    value="Discard Card"
                                    onClick={ this.handleDiscardMoveClick }
                                />
                            </div>
                        }
                        <p className="f6 silver mt4 mb0">RUN</p>
                        <input
                            type="button"
                            className="db mv1 input-reset ba bg-pear-near-white b--pear-light-gray pa3 br2 silver pointer slide-left-1"
                            value="Run Code"
                            onClick={ this.handleRunCode }
                        />
                    </div>
                </div>
                <div className={`absolute absolute--fill bg-near-black ${ this.shouldDisplayOverlay() ? 'o-60 z-999' : 'o-0 z-0 dn' }`}></div>
                <div>
                    <div className="absolute bottom-5 w-50 left-0 z-9 ph2 flex flex-column self-end">
                        <p className="silver f6 mv2 pa2 br2 dib bg-pear-near-white self-end ba b--pear-light-gray">{ `${ this.getPartner().name }'s hand` }</p>
                        <div className="flex-none relative">
                            <Hand
                                cards={ this.getPartnersHand() }
                                inverse
                            />
                        </div>
                    </div>
                    <div className="absolute bottom-5 w-50 right-0 z-999 ph2 flex flex-column">
                        <div className="flex justify-between">
                            <p className="pear-near-white f6 mv2 pa2 br2 dib bg-pear-blue self-start ba b--pear-blue">Your hand</p>
                            { this.shouldDisplayOverlay() &&
                                <input
                                    type="button"
                                    className="db mv1 input-reset ba bg-red b--red pa3 br2 near-white pointer"
                                    value="Cancel Action"
                                    onClick={ this.handleCancelAction }
                                />
                            }
                        </div>
                        <div className="flex-none relative">
                            <Hand
                                cards={ this.getMyHand() }
                                handleCardClick={ this.shouldDisplayOverlay() ? this.handleCardClick : null }
                            />
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}
