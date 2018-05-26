import React, { Component } from "react";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";

import { getGame } from "../../lib/api";
import configureStore from "../../store/configureStore";
import Game from "../../containers/game";
import Spectator from "../../containers/spectator";
import ClientStreamHandler from "../../lib/websocket";

export default class GameProvider extends Component {
  constructor(props) {
    super(props);
    this.store = null;
    this.stream = null;
    this.state = {
      initialState: null,
      err: null,
      ready: false
    };
  }

  componentWillMount() {
    const { gameId } = this.props.match.params;
    const { me } = this.props;
    getGame(gameId)
      .then(initialState => {
        this.setState({
          initialState
        });

        this.store = configureStore(initialState);
        this.stream = new ClientStreamHandler(this.store, gameId);
        return this.stream.ready;
      })
      .then(ready => {
        this.setState({
          ready
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { params, path } = this.props.match;
    const { gameId } = params;
    const { initialState, err, ready } = this.state;

    if (!ready) {
      return <h1>loading</h1>;
    }

    if (err) {
      return (
        <div>
          <p>
            Oops! Something went wrong and we can't fetch that game. Make sure
            you have the right url and try again.
          </p>
          <Link to="/">Go back</Link>
        </div>
      );
    }

    return (
      <Provider store={this.store}>
        {path.indexOf("spectator") > -1 ? (
          <Spectator gameId={gameId} />
        ) : (
          <Game gameId={gameId} stream={this.stream} />
        )}
      </Provider>
    );
  }
}
