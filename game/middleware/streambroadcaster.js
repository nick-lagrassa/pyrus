export default class StreamBroadcaster {
    constructor(streams) {
        this.streams = streams;
    }

    broadcast() {
        const streams = this.streams;
        return store => next => action => {
            if (streams) {
                for (let playerId in streams) {
                    streams[playerId].sendAction(action);
                }
            }

            return next(action);
        }
    }
}
