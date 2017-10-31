import Move from '../Move';
import { MOVE_CONSUME } from '../../constants/move';

class ConsumeMove extends Move {
    constructor(player, card) {
        super(player);
        this.card = card;
        this.type = MOVE_CONSUME;
    }
}

export default ConsumeMove;
