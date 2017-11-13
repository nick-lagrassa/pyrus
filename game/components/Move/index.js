class Move {
    // The Move class is abstract and is implemented by ConsumeMove, WriteMove and Discard Move
    // -> Move
    constructor(playerId) {
        if (new.target === Move) {
            throw new TypeError("Move is an abstract class.");
        }
        this.playerId = playerId;
    }
}

export default Move;
