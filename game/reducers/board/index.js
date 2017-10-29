import {
    BOARD_UPDATE_EDITOR
} from '../../constants/board';
import settings from '../../config/settings';

const initialState = {
    code: ""
};

export default function board(state=initialState, action) {
    switch (action.type) {
        case BOARD_UPDATE_EDITOR:
            return {
                ...state,
                code: action.editor.getValue()
            };
        default:
            return state;
    }
}
