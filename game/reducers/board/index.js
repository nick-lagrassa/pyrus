import {
    BOARD_UPDATE_EDITOR
} from '../../constants/board';
import settings from '../../config/settings';

const initialState = {
    editor: ''
};

export default function board(state=initialState, action) {
    switch (action.type) {
        case BOARD_UPDATE_EDITOR:
            return {
                ...state,
                editor: action.editor
            };
        default:
            return state;
    }
}
