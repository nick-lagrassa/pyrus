import Move from '../Move';
import { MOVE_WRITE } from '../../constants/move';

class WriteMove extends Move {
    constructor(player, code) {
        super(player);
        this.code = code;
        this.type = MOVE_WRITE;
    }
}

export default WriteMove;
