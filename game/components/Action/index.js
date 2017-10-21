class Action {
    // The Action class is abstract and is implemented by ConsumeAction, WriteAction and Discard Action
    // -> Action
    constructor() {
        if (new.target === Action) {
            throw new TypeError("Prompt is an abstract class.");
        }
    }
}

export default Action;