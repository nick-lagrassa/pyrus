import React, { Component } from "react";
import Recorder from "recorderjs";
import Card from "../card";
import { getGame } from "../../lib/api";

import {
  GAME_STATUS_INIT,
  GAME_STATUS_RUNNING,
  GAME_STATUS_END
} from "../../../../game/constants/game";
import GameInit from "../../containers/gameInit";
import GameRunning from "../../containers/gameRunning";
import GameEnd from "../../containers/gameEnd";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ""
    };
  }

  componentDidMount() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia =
        navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      this.audioContext = new AudioContext();
      navigator.getUserMedia({ audio: true }, this.startUserMedia, e =>
        console.log(e)
      );
    } catch (e) {
      console.log("This browser does not support audio recording");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { game } = this.props;

    if (
      this.recorder &&
      game.status === GAME_STATUS_INIT &&
      nextProps.game.status === GAME_STATUS_RUNNING
    ) {
      this.startRecording();
    }

    if (
      this.recorder &&
      game.status === GAME_STATUS_RUNNING &&
      nextProps.game.status === GAME_STATUS_END
    ) {
      this.stopRecording();
    }
  }

  startUserMedia = stream => {
    this.recorder = new Recorder(
      this.audioContext.createMediaStreamSource(stream)
    );
  };

  startRecording = button => {
    this.recorder && this.recorder.record();
  };

  stopRecording = button => {
    this.recorder && this.recorder.stop();

    // create WAV download link using audio data blob
    this.createDownloadLink();
    this.recorder.clear();
  };

  createDownloadLink = () => {
    const { gameId } = this.props;

    this.recorder &&
      this.recorder.exportWAV(blob => {
        const url = URL.createObjectURL(blob);
        const au = document.createElement("audio");
        const hf = document.createElement("a");

        au.controls = true;
        au.src = url;
        hf.href = url;
        hf.download = gameId + ".wav";
        hf.innerHTML = hf.download;

        document.getElementById("app").appendChild(hf);
        hf.click();
        document.getElementById("app").removeChild(hf);
      });
  };

  handlePlayerNameChange = e => {
    this.setState({
      playerName: e.target.value
    });
  };

  render() {
    const { playerName } = this.state;
    const { game, me, gameId, stream } = this.props;

    let gameElement;

    switch (game.status) {
      case GAME_STATUS_INIT:
        gameElement = <GameInit me={me} stream={stream} />;
        break;
      case GAME_STATUS_RUNNING:
        gameElement = <GameRunning gameId={gameId} stream={stream} />;
        break;
      case GAME_STATUS_END:
        gameElement = <GameEnd gameId={gameId} stream={stream} />;
        break;
      default:
        gameElement = <p>unrecognized game state</p>;
    }

    return <div>{gameElement}</div>;
  }
}
