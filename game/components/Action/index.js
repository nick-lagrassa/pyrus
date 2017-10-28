class Action {
    // The Action class is abstract and is implemented by ConsumeAction, WriteAction and Discard Action
    // -> Action
    constructor(player) {
        if (new.target === Action) {
            throw new TypeError("Action is an abstract class.");
        }
        this.player = player;
    }
}

export default Action;
