import { WS_ACTION, WS_COMMAND } from "../../app/constants/ws";
import {
  COMMAND_RUN_CODE,
  COMMAND_LOG_CODE
} from "../../app/constants/command";
import { PLAYERS_REGISTER_PLAYER } from "../../game/constants/players";
import { ME_SET_INFO } from "../../src/js/constants/me";
import { GAME_START, GAME_END, GAME_END_TURN } from "../../game/constants/game";
import {
  MOVE_DISCARD,
  MOVE_CONSUME,
  MOVE_WRITE
} from "../../game/constants/move";
import DiscardMove from "../../game/components/DiscardMove";
import WriteMove from "../../game/components/WriteMove";
import { encode, decode } from "../util/safeEncode";
import trimBrackets from "../util/trimBrackets";
import * as prompts from "../../game/lib/prompts";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default class ServerStreamHandler {
  constructor(socket, game, playerId, logger) {
    this.socket = socket;
    this.game = game;
    this.playerName = null;
    this.playerId = playerId;
    this.logger = logger;

    this.socket.addEventListener("message", message => {
      const data = JSON.parse(message.data);
      this.logger.log({
        sender: "CLIENT",
        playerId: this.playerId,
        name: this.playerName,
        data
      });
      switch (data.type) {
        case WS_ACTION:
          this.handleWSAction(data.action);
          break;
        case WS_COMMAND:
          this.handleWSCommand(data.command);
          break;
      }
    });

    // print error message
    this.socket.addEventListener("error", err => {
      console.log("ServerStreamHandler received error: %s", err);
    });
  }

  // Send message (action) into this.socket to be received on client side
  // obj ->
  sendAction(action) {
    const data = JSON.stringify({
      type: WS_ACTION,
      action
    });
    this.logger.log({
      sender: "SERVER",
      playerId: this.playerId,
      data
    });
    this.socket.send(data);
  }

  handleWSAction(action) {
    switch (action.type) {
      case PLAYERS_REGISTER_PLAYER:
        this.playerName == action.name;

        if (this.game.registerPlayer(action.name, this.playerId)) {
          this.sendAction({
            type: ME_SET_INFO,
            name: action.name,
            id: this.playerId
          });
        }
        break;
      case GAME_START:
        this.game.start();
        break;
      case GAME_END_TURN:
        if (this.playerId === this.game.activePlayer.id) {
          this.game.endTurn();
        }
        break;
      case GAME_END:
        this.game.end();
        break;
      default:
        break;
    }
  }

  handleWSCommand(command) {
    switch (command.type) {
      case COMMAND_RUN_CODE:
        let tests = [];
        let formattedInputs = [];
        let prompt = new prompts[command.constructor]();

        for (let i = 0; i < prompt.tests.length; i++) {
          const test = prompt.tests[i];
          let formattedInput = trimBrackets(JSON.stringify(test.input));
          formattedInputs.push(formattedInput);
          tests.push(
            exec(
              `safeEval '(${encode(command.fn)})(${encode(formattedInput)})'`
            )
          );
        }

        Promise.all(tests)
          .then(values => {
            let results = [];
            for (let i = 0; i < values.length; i++) {
              const { error, stdout, stderr } = values[i];
              if (error) {
                console.error(`exec error: ${error}`);
                break;
              } else if (stderr) {
                results.push({
                  passed: false,
                  input: formattedInputs[i],
                  output: `Error: ${stderr}`,
                  expected: prompt.tests[i].expected
                });
              } else if (stdout) {
                const result = JSON.parse(stdout);
                results.push({
                  // TODO: implement custom checks for equality
                  passed: prompt.equivalent(
                    result.value,
                    prompt.tests[i].expected
                  ),
                  input: formattedInputs[i],
                  output: result.value,
                  expected: prompt.tests[i].expected,
                  console: result.console
                });
              }
            }

            this.game.testResults = results;
          })
          .catch(reason => {
            console.error(reason);
          });
        break;
      case COMMAND_LOG_CODE:
        // this is a no-op because the ServerStreamHandler already logs all messages
        console.log(COMMAND_LOG_CODE);
        break;
      default:
        break;
    }
  }
}
