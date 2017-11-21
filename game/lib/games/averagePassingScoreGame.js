import Game from '../../components/Game';
import { AveragePassingScorePrompt } from '../prompts';
import configureStore from '../../store/configureStore';


export default function makeGame(gameId, streams) {
    const store = configureStore(gameId, streams);
    return new Game(new AveragePassingScorePrompt(), store);
};
