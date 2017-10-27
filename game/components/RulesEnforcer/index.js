class RulesEnforcer {
    constructor(store) {
        this._store = store;
    }

    // Returns whether a given action is legal to perform
    // Board, Action -> bool
    isLegalAction(board, action) {
        return true;
    }
}

export default RulesEnforcer;