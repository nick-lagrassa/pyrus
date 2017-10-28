import express from 'express';
import settings from './config/settings';
import * as games from '../game/lib/games';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log('Game server listening on port ' + port);
});

app.get('/new/:game', (req, res) => {
    const game = req.params.game || settings.DEFAULT_GAME;

    if (game in games) {
        const newGame = games[game]();
        res.json(newGame._store.getState());
    } else {
        res.status(404).send(`We don't have a game called ${game}! Try again.`);
    }
});
