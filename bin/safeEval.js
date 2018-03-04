#!/usr/bin/env node
var VM2 = require("vm2");
var safeEncode = require("../app/util/safeEncode");
var trimBrackets = require("../app/util/trimBrackets");
Number.isNaN = require("is-nan");

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

    // because JSON can't encode NaN or Infinity values, we have to serialize
    // them ourselves
    if (Number.isNaN(value)) {
      value = "NaN";
    }

    if (value === Infinity) {
      value = "Infinity";
    }

    var logs = [];

    // this is a huge hack: basically the issue is that VM2 doesn't allow you
    // to hook into the console. so essentially what we're doing here is, after
    // running the script once using the VM2 vm, we know that it won't time out.
    // then, we run it in a NodeVM, which does give us access to the console, and
    // take the console info from that.
    var nodevm = new VM2.NodeVM({
      console: "redirect",
      sandbox: {}
    });

    nodevm.on("console.log", function(...log) {
      logs.push(trimBrackets(JSON.stringify(log)));
    });

    nodevm.run(code);

    process.stdout.write(
      JSON.stringify({
        console: logs,
        value: value
      })
    );
  } catch (e) {
    if (Date.now() - timestamp > TIMEOUT_MS) {
      process.stderr.write("Timeout has occurred");
    } else {
      process.stderr.write(e.message);
    }
  }
}

safeEval(safeEncode.decode(process.argv[2]));
