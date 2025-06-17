import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['bundler-fasm', fasm],
    ],
});

test('plugin-bundler-fasm: transform: replace-section-code-with-functions', (t) => {
    t.transform('replace-section-code-with-functions');
    t.end();
});

test('plugin-bundler-fasm: transform: replace-section-const-with-equ', (t) => {
    t.transform('replace-section-const-with-equ');
    t.end();
});
