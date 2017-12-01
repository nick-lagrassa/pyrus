#!/usr/bin/env node
var envfile = require('envfile');
var ip = require('ip');
var getPort = require('get-port');
var fs = require('fs');

var sourcePath = '.env';
var env = envfile.parseFileSync(sourcePath);

if (process.argv.length > 2) {
    env.APP_BACKEND = ip.address();
} else {
    env.APP_BACKEND = 'localhost';
}

Promise.all([getPort(), getPort()])
    .then(function(values) {
        env.APP_BACKEND_PORT = values[0];
        env.APP_FRONTEND_PORT = values[1];
        fs.writeFileSync(sourcePath, envfile.stringifySync(env));
    })
    .catch(function(e) {
        console.log(e);
    });
