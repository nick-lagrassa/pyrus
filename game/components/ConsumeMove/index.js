import Move from '../Move';
import { MOVE_CONSUME } from '../../constants/move';

class ConsumeMove extends Move {
    constructor(playerId, card) {
        super(playerId);
        this.card = card;
        this.type = MOVE_CONSUME;
    }
}

export default ConsumeMove;
