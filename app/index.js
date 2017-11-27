import http from 'http';
import express from 'express';
import url from 'url';
import settings from './config/settings';
import * as gamesLibrary from '../game/lib/games';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import ws from 'ws';
import ServerStreamHandler from './websocket';
import PearLogger from './logger';
import dotenv from 'dotenv';
import ip from 'ip';

dotenv.config();

if (process.argv.length === 3 && process.argv[2] === '--env.study') {
    process.env.APP_BACKEND = ip.address();
}

const app = express();
const port = process.env.APP_BACKEND_PORT || 4000;
app.use(bodyParser.json());

const server = http.createServer(app);
const activeGames = {};
const activeStreams = {};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(port, process.env.APP_BACKEND, () => {
    console.log(`Game server running at ${ process.env.APP_BACKEND }:${ port }`);
});

const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server });

wss.on('connection', (socket, req) => {
    const id = url.parse(req.url, true).path.replace('/', '');
    const hash = crypto.createHash('md5');
    const playerId = hash.update(id + Date.now() + Math.random()).digest('hex');
    const stream = new ServerStreamHandler(socket, activeGames[id], playerId, new PearLogger(id));
    activeStreams[id][playerId] = stream;
});

app.get('/new/:gameTitle', (req, res) => {
    const gameTitle = req.params.gameTitle || settings.DEFAULT_GAME;
    const uid = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) + Date.now();

    if (gameTitle in gamesLibrary) {
        const hash = crypto.createHash('md5');
        const gameId = hash.update(uid).digest('hex');
        activeStreams[gameId] = {};
        const newGame = gamesLibrary[gameTitle](gameId, activeStreams[gameId]);
        activeGames[gameId] = newGame;
        res.json({ gameId });
    } else {
        res.status(404).send(`We don't have a game called ${ gameTitle }! Try again.`);
    }
});

app.get('/challenge/:gameId', (req, res) => {
    const { gameId } = req.params;

    if (gameId in activeGames) {
        const game = activeGames[gameId];
        res.json(game._store.getState());
    } else {
        res.status(404).send(`Oops! Looks like your game ID is invalid. Try again.`);
    }
});

export default activeStreams;
