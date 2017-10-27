import Game from '../../components/Game';
import { ValidParenthesesPrompt } from '../prompts';
import configureStore from '../../store/configureStore';

const store = configureStore();

export default function makeGame() {
    return new Game(new ValidParenthesesPrompt(), store);
};
