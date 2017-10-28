class Move {
    // The Move class is abstract and is implemented by ConsumeMove, WriteMove and Discard Move
    // -> Move
    constructor(player) {
        if (new.target === Move) {
            throw new TypeError("Move is an abstract class.");
        }
        this.player = player;
    }
}

export default Move;
