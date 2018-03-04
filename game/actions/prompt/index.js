import {
  PROMPT_SET_PROMPT,
  PROMPT_SET_TEST_RESULTS
} from "../../constants/prompt";

export const setPrompt = prompt => ({
  type: PROMPT_SET_PROMPT,
  prompt
});

export const setPromptTestResults = results => ({
  type: PROMPT_SET_TEST_RESULTS,
  results
});
