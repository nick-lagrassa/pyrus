import {
    PROMPT_SET_PROMPT
} from '../../constants/prompt';
import settings from '../../config/settings';

const initialState = {};

export default function board(state=initialState, action) {
    switch (action.type) {
        case PROMPT_SET_PROMPT:
            return {
                ...action.prompt
            };
        default:
            return state;
    }
}
