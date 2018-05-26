import React, { Component } from "react";

import Editor from "../../containers/editor";
import Prompt from "../../containers/prompt";
import { GAME_END } from "../../../../game/constants/game";
import {
  COMMAND_RUN_CODE,
  COMMAND_LOG_CODE
} from "../../../../app/constants/command";

const LOG_CODE_INTERVAL_MS = 30000;

export default class GameRunning extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isWaitingForTestResults: false,
      shouldDisplaySubmitModal: false,
      shouldDisplayTestResultsIndicator: false
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.interval = setInterval(this.sendCodeLog, LOG_CODE_INTERVAL_MS);
  }

  componentWillUpdate(nextProps, nextState) {
    const { isWaitingForTestResults } = this.state;
    const { prompt, game } = this.props;
    if (
      isWaitingForTestResults &&
      prompt._testRunTimestampMS !== nextProps.prompt._testRunTimestampMS
    ) {
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleRunCodeClick = () => {
    const { prompt, stream } = this.props;
    stream.sendCommand({
      type: COMMAND_RUN_CODE,
      fn: `(${prompt._signature}{${this.editorElement.doc.getValue() + "\n"}})`,
      constructor: prompt._constructor
    });

    this.setState({
      isWaitingForTestResults: true,
      shouldDisplayTestResultsIndicator: false
    });
  };

  handleSubmitCodeClick = () => {
    this.setState({
      shouldDisplaySubmitModal: true
    });
  };

  handleConfirmSubmitCodeClick = () => {
    const { stream } = this.props;
    stream.sendAction({
      type: GAME_END,
      code: this.editorElement.doc.getValue()
    });
  };

  sendCodeLog = () => {
    const { stream, prompt, me, game } = this.props;

    stream.sendCommand({
      type: COMMAND_LOG_CODE,
      fn: `(${prompt._signature}{${this.editorElement.doc.getValue() + "\n"}})`,
      constructor: prompt._constructor
    });
  };

  render() {
    const { game, gameId, stream, me } = this.props;
    const {
      isWaitingForTestResults,
      shouldDisplaySubmitModal,
      shouldDisplayTestResultsIndicator
    } = this.state;

    if (!me.id) {
      return <div>loading...</div>;
    }

    return (
      <div className="flex flex-column vh-100 relative overflow-hidden">
        {shouldDisplaySubmitModal && (
          <div className="absolute absolute--fill z-9999">
            <div className="absolute absolute--fill bg-near-black o-60" />
            <div className="mw6 mt6 bg-pear-near-white br2 pa4 relative center">
              <h2 className="mv0">
                You won't be able to make changes after submitting. Are you sure
                you want to proceed?
              </h2>
              <div className="flex justify-around mt3">
                <input
                  type="button"
                  className="db w4 input-reset ba bg-red b--red pa3 br2 near-white pointer"
                  value="Yes"
                  onClick={this.handleConfirmSubmitCodeClick}
                />
                <input
                  type="button"
                  className="db w4 input-reset ba bg-pear-near-white b--pear-light-gray pa3 br2 silver pointer mr2"
                  value="No"
                  onClick={() =>
                    this.setState({ shouldDisplaySubmitModal: false })
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex mw8 center">
          <div
            className="w-50 pt3 ph3 overflow-scroll relative"
            onScroll={() =>
              this.setState({ shouldDisplayTestResultsIndicator: false })
            }
          >
            <Prompt isWaitingForTestResults={isWaitingForTestResults} />
            {shouldDisplayTestResultsIndicator && (
              <div className="absolute top-2 right-2 pa3 bg-pear-yellow br2">
                👇 New test results!
              </div>
            )}
          </div>
          <div className="w-50 pt3 ph3 pb7 overflow-scroll">
            <Editor
              gameId={gameId}
              getEditor={editor => (this.editorElement = editor)}
            />
          </div>
          <div className="absolute right--2 top-3 slide-left-3 flex flex-column z-999">
            <div className="flex flex-column mb4">
              <p className="f6 silver mb0">RUN AND SUBMIT</p>
              <input
                type="button"
                className="db mv1 input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer slide-left-1"
                value="Run Code"
                onClick={this.handleRunCodeClick}
              />
              <input
                type="button"
                className={`db mv1 input-reset ba bg-pear-green b--pear-green pa3 br2 white pointer slide-left-1`}
                value="Submit Code"
                onClick={this.handleSubmitCodeClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
