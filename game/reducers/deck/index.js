import { DECK_POP, DECK_INITIALIZE, DECK_SHUFFLE } from "../../constants/deck";
import { GAME_RESET } from "../../constants/game";
import shuffle from "fisher-yates";

const initialState = {
  cards: [],
  discard: []
};

export default function deck(state = initialState, action) {
  switch (action.type) {
    case DECK_INITIALIZE:
      return {
        ...state,
        cards: action.cards
      };
      break;
    case DECK_POP:
      const newCards = state.cards.slice();
      const newDiscard = state.discard.slice();
      const draw = Math.min(action.num, newCards.length);
      for (let i = 0; i < draw; i++) {
        newDiscard.push(newCards.shift());
      }

      return {
        ...state,
        cards: newCards,
        discard: newDiscard
      };
      break;
    case DECK_SHUFFLE:
      return {
        ...state,
        cards: shuffle(state.cards.slice())
      };
      break;
    case GAME_RESET:
      return {
        ...state,
        cards: state.discard.slice(),
        discard: []
      };
      break;
    default:
      return state;
  }
}
