import Move from '../Move';
import { MOVE_DISCARD } from '../../constants/move';

class DiscardMove extends Move {
    constructor(player, card) {
        super(player);
        this.card = card;
        this.type = MOVE_DISCARD;
    }
}

export default DiscardMove;
