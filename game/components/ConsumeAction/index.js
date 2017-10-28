import Action from '../Action';

class ConsumeAction extends Action {
    constructor(card) {
        super();
        this.card = card;
    }
}

export default ConsumeAction;