import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optimizer-fasm', fasm],
    ],
});

test('plugin-fasm: convert-mov-to-xor', (t) => {
    t.transform('convert-mov-to-xor');
    t.end();
});
