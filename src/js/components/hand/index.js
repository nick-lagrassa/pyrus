import React, { Component } from "react";
import Card from "../card";

export default class Hand extends Component {
  render() {
    const {
      cards,
      handleCardClick,
      inverse = false,
      selectedCard,
      handContainer
    } = this.props;

    if (!handContainer) {
      return null;
    }

    let offset = 100;
    const handContainerWidth = handContainer.getBoundingClientRect().width;

    if (this.cardWidth) {
      offset = (handContainerWidth - this.cardWidth) / cards.length;
    }

    return cards
      ? cards.map((card, i) => (
          <Card
            key={i}
            card={card}
            handleCardClick={handleCardClick || null}
            style={
              inverse
                ? { right: `${(cards.length - i - 1) * offset}px` }
                : { left: `${i * offset}px` }
            }
            shouldFloat={selectedCard === card}
            getCard={e => {
              if (!this.cardWidth) {
                this.cardWidth = e.getBoundingClientRect().width;
              }
            }}
          />
        ))
      : null;
  }
}
