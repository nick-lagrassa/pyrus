import Move from "../Move";
import { MOVE_CONSUME } from "../../constants/move";

class ConsumeMove extends Move {
  constructor(playerId, card, code) {
    super(playerId);
    this.card = card;
    this.type = MOVE_CONSUME;
    this.code = code;
  }
}

export default ConsumeMove;
