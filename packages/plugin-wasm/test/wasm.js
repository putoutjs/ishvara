import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('ishvara: putout-wast: apply-putout-wast-import', (t) => {
    t.transform('apply-putout-wast-import');
    t.end();
});

test('ishvara: putout-wast: convert-var-to-const', (t) => {
    t.transform('convert-var-to-const');
    t.end();
});
