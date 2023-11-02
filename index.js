const wasmPath = require('path').resolve(__dirname, './main.wasm');
const run = require('./run');

console.log('Start index.js');

run(wasmPath)
    .then(() => {
        // console.log('global.test_var: ', global.test_var);
        console.log('global.add(1, 2): ', global.add(1, 2));
        console.log('global.show("A", "B"): ', global.show('A', 'B'));
        console.log('global.Keccak256("Hello"): ', global.Keccak256('Hello'));
        console.log('global.decA: ', global.decA('123'));
        const str1 =
            'E0OKQ7XIMto8s6sG8YNekx455w5GXZlYp65Qf1xHH0ZyMZJ6R4mbRb8bzWNQLnhubfJCHrNu0HI28/Tz2Dxg/LD0nzz0xbkS2ozj2mNs+Zi428dDOrdbwmyFSVmkcZDfWXGEOE57ow8uU7Ox4jRxe/YS2wcE86kwOmjJy8KDTCcKTQTrxl9q/kGLS/lkaYyGPYyEcTpW43R3bJSjXRaI3+XdJsm+7DFDrc2mlpWimp1TEv9N5v+v8ACuAdtPuY/q7RisoIlY9sDQ8UFkC+29UL0tHwAI+LGQy7KvcKuGOordcSM+xZGGlHJjA0wM4pEC4GWz5HXWAPXQTZkcMhTx6w==';
        const str2 =
            'iDhJRiN7aUazxZW9WdV/jT5w0wjOmNlRWykjpkcrD89MMBmLR6pF4oKcLORCH/SW47j176X68cgyXxez8GVEs5v9zYm1oqN19ZwWEft41zOGatmh8mK4IajmYwmjQ8Xa2wcuoxTQI4RK4TuReJ1Ov8OMcmgN7RIly9Dzl2SvlKAafDwLNMaR4hWEFbBtZ1PZ9Ra4tPVQ2pxUGrjUUJJeLlNvQLiFTDvW6SM0plajLF7/KIles2puHrfhXpV0mByE4sWcJuyLubmTUy/qQrqX8BeFUOe60KiqFq8WbzXbpWw2bAbanWHGRnTxXQ/y4hhWFNOhJZs7wLny3Ht4KPCzfA==';

        // console.log('global.decA: ', global.decA(str1));
        // console.log('global.decrypts: ', global.decrypts([str1, str2]));
    })
    .catch((err) => {
        console.error('index err: ', err);
    });
