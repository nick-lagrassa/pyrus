import { WS_ACTION, WS_COMMAND } from "../../../app/constants/ws";

export default class ClientStreamHandler {
  constructor(store, gameId) {
    this.store = store;
    this.gameId = gameId;
    this.ready = new Promise(resolve => {
      this.socket = new WebSocket(
        `ws://${process.env.APP_BACKEND}:${process.env.APP_BACKEND_PORT}/${
          this.gameId
        }`
      );

      this.socket.addEventListener("message", message => {
        const data = JSON.parse(message.data);
        if (data.type === WS_ACTION) {
          this.store.dispatch(data.action);
        }
      });

      this.socket.addEventListener("error", err => {
        console.log("ClientStreamHandler received error: %s", err);
      });

      this.socket.addEventListener("open", () => {
        resolve(true);
      });
    });
  }

  // Send message (action or code) into socket to be received on server side
  // obj ->
  sendAction = action => {
    this.socket.send(
      JSON.stringify({
        type: WS_ACTION,
        action
      })
    );
  };

  sendCommand = command => {
    this.socket.send(
      JSON.stringify({
        type: WS_COMMAND,
        command
      })
    );
  };
}
