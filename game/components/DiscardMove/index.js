import Move from '../Move';
import { MOVE_DISCARD } from '../../constants/move';

class DiscardMove extends Move {
    constructor(playerId, card) {
        super(playerId);
        this.card = card;
        this.type = MOVE_DISCARD;
    }
}

export default DiscardMove;
