#!/usr/bin/env node
var VM2 = require('vm2');
var safeEncode = require('../app/util/safeEncode');
var TIMEOUT_MS = 500;
var vm = new VM2.VM({ timeout: TIMEOUT_MS });

function safeEval(code) {
    var script;
    var timestamp = Date.now();
    try {
        script = new VM2.VMScript(code).compile();
    } catch (e) {
        process.stderr.write(e.message);
        return;
    }
    

    try {
        var value = vm.run(script);
        process.stdout.write(JSON.stringify({
            // TODO: figure out how to pipe console logs from the vm to this property so we can display it
            console: '',
            value: value
        }));
    } catch (e) {
        if (Date.now() - timestamp > TIMEOUT_MS) {
            process.stderr.write('Timeout has occurred');
        } else {
            process.stderr.write(e.message);
        }
    }
}

var fn = '(' + safeEncode.decode(process.argv[2]) + ')(' + safeEncode.decode(process.argv[3]) + ')';
safeEval(fn);
