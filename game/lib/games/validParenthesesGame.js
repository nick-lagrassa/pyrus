import Game from '../../components/Game';
import { ValidParenthesesPrompt } from '../prompts';
import configureStore from '../../store/configureStore';


export default function makeGame(gameId) {
    const store = configureStore(gameId);
    return new Game(new ValidParenthesesPrompt(), store);
};
