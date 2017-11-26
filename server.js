import express from 'express';

const app = express();
const port = process.env.APP_PORT || 5000;

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

app.listen(port, () => console.log(`App listening on port ${ port }`));
