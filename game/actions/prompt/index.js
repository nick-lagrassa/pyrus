import {
    PROMPT_SET_PROMPT,
} from '../../constants/prompt';

export const setPrompt = prompt => ({
    type: PROMPT_SET_PROMPT,
    prompt
});
