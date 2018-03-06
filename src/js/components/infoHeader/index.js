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
        className={`h3 ${
          myTurn(me, game, players)
            ? "bg-pear-blue white"
            : "bg-pear-light-gray"
        } flex justify-between items-center pa3`}
      >
        <span>{`${
          myTurn(me, game, players) ? "Your" : `${activePlayer.name}'s`
        } Turn`}</span>
        <span>{`${game.numMovesRemaining} Actions Remaining `}</span>
        <span>{`${deck.cards.length} Cards Remaining in Deck`}</span>
      </div>
    );
  }
}
