import { BOARD_UPDATE_EDITOR } from "../../constants/board";
import { GAME_RESET } from "../../constants/game";
import settings from "../../config/settings";

const initialState = {
  editor: "",
  lastResetTimestampMS: 0
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case BOARD_UPDATE_EDITOR:
      return {
        ...state,
        editor: action.editor
      };
    case GAME_RESET:
      return {
        editor: "",
        lastResetTimestampMS: Date.now()
      };
    default:
      return state;
  }
}
