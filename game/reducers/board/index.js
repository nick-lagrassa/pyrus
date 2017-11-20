import { BOARD_UPDATE_EDITOR } from '../../constants/board';
import { GAME_RESET } from '../../constants/game';
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
        case GAME_RESET:
            return initialState;
        default:
            return state;
    }
}
