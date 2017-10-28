import Action from '../Action';
import { ACTION_DISCARD } from '../../constants/action';

class DiscardAction extends Action {
    constructor(player, card) {
        super(player);
        this.card = card;
        this.type = ACTION_DISCARD;
    }
}

export default DiscardAction;
