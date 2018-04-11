import React, { Component } from "react";

import InfoHeader from "../../containers/infoHeader";
import Editor from "../../containers/editor";
import Prompt from "../../containers/prompt";
import { GAME_STATUS_RUNNING } from "../../../../game/constants/game";

export default class GameRunning extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isWaitingForTestResults: false,
      shouldDisplayTestResultsIndicator: false
    };
    this.state = this.initialState;
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

  render() {
    const { me, game, gameId, stream, players } = this.props;
    const {
      isWaitingForTestResults,
      shouldDisplayTestResultsIndicator
    } = this.state;

    if (game.status !== GAME_STATUS_RUNNING) {
      return <div>waiting for game to start</div>;
    }

    return (
      <div className="flex flex-column vh-100 relative overflow-hidden">
        <InfoHeader />
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
          <div
            className={`w-50 pt3 ph3 pb7 overflow-scroll relative not-allowed`}
          >
            <Editor
              gameId={gameId}
              isMoveCancelled={false}
              getEditor={editor => (this.editorElement = editor)}
              handleEditorChange={() => {}}
              resetIsMoveCancelled={() => {}}
              enabled={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
