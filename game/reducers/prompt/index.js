import {
  PROMPT_SET_PROMPT,
  PROMPT_SET_TEST_RESULTS
} from "../../constants/prompt";
import { GAME_RESET } from "../../constants/game";
import settings from "../../config/settings";

const initialState = {};

export default function board(state = initialState, action) {
  switch (action.type) {
    case PROMPT_SET_PROMPT:
      return {
        ...action.prompt
      };
    case PROMPT_SET_TEST_RESULTS:
      return {
        ...state,
        _testResults: action.results,
        _testRunTimestampMS: Date.now()
      };
    case GAME_RESET:
      return {
        ...state,
        _testResults: []
      };
    default:
      return state;
  }
}
