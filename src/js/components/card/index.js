import React, { Component } from "react";
import {
  MOVE_DISCARD,
  MOVE_WRITE,
  MOVE_CONSUME
} from "../../../../game/constants/move";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
  }

  componentDidMount() {
    const { getCard } = this.props;
    getCard(this.cardElement);
  }

  render() {
    const { card, handleCardClick, style, shouldFloat } = this.props;
    const { isMouseOver } = this.state;

    if (!card) {
      return null;
    }

    return (
      <div
        className={`w5 h5 ba b--pear-light-gray br2 pa3 bg-white transition pointer flex-none absolute overflow-scroll ${
          isMouseOver || shouldFloat ? "z-999 rise" : "z-99"
        }`}
        onClick={handleCardClick ? () => handleCardClick(card) : () => {}}
        onMouseOver={() => this.setState({ isMouseOver: true })}
        onMouseLeave={() => this.setState({ isMouseOver: false })}
        style={style}
        ref={e => (this.cardElement = e)}
      >
        <p className="f3 mt0">{card.title}</p>
        <p className="f6 mv0 silver">Syntax</p>
        <div className="bg-pear-near-white pa2 mv2">
          <pre className="f6 code mv0 pre">{card.implementation}</pre>
        </div>
        <p className="f6 mv0 silver">Examples</p>
        <div className="bg-pear-near-white pa2">
          <pre className="f6 code mv0 pre">{card.example}</pre>
        </div>
      </div>
    );
  }
}
