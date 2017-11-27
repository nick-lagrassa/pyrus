import express from 'express';
import dotenv from 'dotenv';
import ip from 'ip';

dotenv.config();
if (process.argv.length === 3 && process.argv[2] === '--env.study') {
    process.env.APP_BACKEND = ip.address();
}

const app = express();
const port = process.env.APP_FRONTEND_PORT || 5000;

app.get('*', (req, res) => {
    const options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    if (req.params[0].match(/\/bundle\.js/) || req.params[0].match(/\/tachyons\.css/)) {
        const filename = req.params[0].split('/').pop();
        res.sendFile(filename, options);
    } else {
        res.sendFile('index.html', options);
    }
});

app.listen(port, process.env.APP_BACKEND, () => console.log(`App running at ${ process.env.APP_BACKEND }:${ port }`));
