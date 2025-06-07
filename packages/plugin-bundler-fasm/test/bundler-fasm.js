import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optimizer-fasm', fasm],
    ],
});

test('plugin-bundler-fasm: transform: move-functions-before-data', (t) => {
    t.transform('move-functions-before-data');
    t.end();
});
