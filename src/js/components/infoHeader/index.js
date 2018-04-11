import React, { Component } from "react";
import {
  activePlayerIndex,
  getActivePlayer,
  myTurn
} from "../../../../game/util";

export default class InfoHeader extends Component {
  render() {
    const { me, game, deck, players } = this.props;
    const activePlayer = getActivePlayer(game, players);

    return (
      <div
        className={`h3 bg-pear-blue white flex justify-between items-center pa3`}
      />
    );
  }
}
