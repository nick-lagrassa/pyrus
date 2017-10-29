import {
    BOARD_UPDATE_EDITOR
} from '../../constants/board';

export const updateEditor = editor => ({
    type: BOARD_UPDATE_EDITOR,
    editor
});
