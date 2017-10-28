import Action from '../Action';

class DiscardAction extends Action {
    constructor(card) {
        super();
        this.card = card;
    }
}

export default DiscardAction;