const wasmPath = require('path').resolve(__dirname, './main.wasm');
const run = require('./run');

console.log('[index.js] Start.');

run(wasmPath)
    .then(async () => {
        const first = await twoSum(1, 2);
        console.log('[index.js] firstTwoSum: ', first);

        // const second = await twoSum(1);
        // console.log('secondTwoSum: ', second);

        console.log('[index.js] global.show: ', global.show(1, 2, 3, 4, 5));
    })
    .catch((err) => {
        console.error(err);
    });
