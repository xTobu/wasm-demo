globalThis.require = require;
globalThis.fs = require('fs');
globalThis.TextEncoder = require('util').TextEncoder;
globalThis.TextDecoder = require('util').TextDecoder;
globalThis.performance ??= require('performance');
globalThis.crypto ??= require('crypto');

require('./wasm_exec.js');

// isWait = true, 代表是否要等到 go 執行結束後再執行 js 程式碼
// isWait = false, 如果 js 需要呼叫 go 方法, 那就不能 wait
module.exports = async (wasmPath, isWait) => {
    const buf = fs.readFileSync(wasmPath);
    const go = new Go();

    return WebAssembly.instantiate(buf, go.importObject)
        .then((result) => {
            process.on('exit', (code) => {
                process.exit();
            });
            
            if (isWait) {
                return go.run(result.instance);
            } else {
                go.run(result.instance);
            }
            return;
        })
        .catch((err) => {
            console.error('err: ', err);
            process.exit(1);
        });
};
