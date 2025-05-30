import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optimizer-fasm', fasm],
    ],
});

test('plugin-optimizer-fasm: convert-mov-to-xor', (t) => {
    t.transform('convert-mov-to-xor');
    t.end();
});

test('plugin-optimizer-fasm: transform: join-one-byte-registers-assign', (t) => {
    t.transform('join-one-byte-registers-assign');
    t.end();
});
