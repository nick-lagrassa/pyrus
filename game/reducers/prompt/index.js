import {
    PROMPT_SET_PROMPT,
    PROMPT_SET_TEST_RESULTS,
    PROMPT_SET_EXAMPLE_TEST_RESULTS
} from '../../constants/prompt';
import { GAME_RESET } from '../../constants/game';
import settings from '../../config/settings';

const initialState = {
    _testResults: [],
    _exampleTestResults: [],
};

export default function prompt(state=initialState, action) {
    switch (action.type) {
        case PROMPT_SET_PROMPT:
            return {
                ...action.prompt
            };
        case PROMPT_SET_TEST_RESULTS:
            return {
                ...state,
                _testResults: action.results
            };
        case PROMPT_SET_EXAMPLE_TEST_RESULTS:
            return {
                ...state,
                _exampleTestResults: action.results
            };
        case GAME_RESET:
            return {
                ...state,
                _exampleTestResults: [],
                _testResults: []
            };
        default:
            return state;
    }
}
