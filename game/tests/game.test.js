import { GAME_STATUS_INIT, GAME_STATUS_RUNNING } from "../constants/game";
import settings from "../config/settings";
import Game from "../components/Game";
import ValidParenthesesPrompt from "../lib/prompts/ValidParenthesesPrompt";
import ConsumeMove from "../components/ConsumeMove";
import DiscardMove from "../components/DiscardMove";
import WriteMove from "../components/WriteMove";

test("ValidParenthesesGame runs correctly", () => {
  const game = new Game(new ValidParenthesesPrompt(), null);
  expect(game.status).toBe(GAME_STATUS_INIT);
  expect(game._board.players).toHaveLength(0);

  expect(game.registerPlayer("Jack", 0)).toBe(true);
  expect(game._board.players).toHaveLength(1);
  expect(game._board.players[0].name).toBe("Jack");

  expect(game.registerPlayer("Jornagan", 2)).toBe(false);

  game.start();
  expect(game.status).toBe(GAME_STATUS_RUNNING);
  expect(game.activePlayerIndex).toBe(0);

  expect(game._board.players[0].hand).toHaveLength(
    settings.NUM_CARDS_DRAWN_AT_GAME_START
  );
});
