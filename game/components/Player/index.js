import Action from '../Action';
import settings from '../../config/settings';

class Player {
    constructor(name) {
        this._name = name;
        this._hand = [];
    }

    get name() {
        return this._name;
    }

    get hand() {
        return this._hand;
    }

    // Adds cards to the player's hand
    // List[Card] ->
    addCards(cards) {
        const newHand = [...this._hand, ...cards];

        while (newHand.length > settings.MAX_CARDS_PER_HAND) {
            // this is dummy code: in the real game here we would need to wait
            // for player input to select the card(s) to remove
            newHand.pop();
        }

        this._hand = newHand;
    }

    // Constructs an Action object
    makeAction() {
        
    }
}

export default Player;