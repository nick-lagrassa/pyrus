class Deck {
    constructor(initialState) {
        this.endTurnPickupValue = 2;
        this.currentSet = initialState;
    }

    removeOne() {
        if(emptyDeck())
          return null;
        return this.currentSet.pop(0)
    }

    removeTwo() {
        let playerPickup = []
        for(let i = 0; i < this.endTurnPickupValue; i++) {
            playerPickup.push(removeOne());
        return playerPickup;
    }

    emptyDeck() {
        return this.currentSet.length == 0;
    }
}

export default Deck;
