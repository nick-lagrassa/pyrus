import {
    PROMPT_SET_PROMPT,
    PROMPT_SET_TEST_RESULTS,
    PROMPT_SET_EXAMPLE_TEST_RESULTS
} from '../../constants/prompt';

export const setPrompt = prompt => ({
    type: PROMPT_SET_PROMPT,
    prompt
});

export const setPromptExampleTestResults = results => ({
    type: PROMPT_SET_EXAMPLE_TEST_RESULTS,
    results
});

export const setPromptTestResults = results => ({
    type: PROMPT_SET_TEST_RESULTS,
    results
});
