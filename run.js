globalThis.require = require;
globalThis.fs = require('fs');
globalThis.TextEncoder = require('util').TextEncoder;
globalThis.TextDecoder = require('util').TextDecoder;
globalThis.performance ??= require('performance');
globalThis.crypto ??= require('crypto');

require('./wasm_exec.js');


module.exports = async (wasmPath, isWait) => {
    const buf = fs.readFileSync(wasmPath);
    const go = new Go();

    return WebAssembly.instantiate(buf, go.importObject)
        .then((result) => {
            process.on('exit', (code) => {
                process.exit();
            });

            go.run(result.instance);
        })
        .catch((err) => {
            console.error('err: ', err);
            process.exit(1);
        });
};
