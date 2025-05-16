import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-mov-to-xor', plugin],
    ],
});

test('optimizer-fasm: convert-mov-to-xor: report', (t) => {
    t.report('convert-mov-to-xor', `Use 'xor' instead of 'mov'`);
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform', (t) => {
    t.transform('convert-mov-to-xor');
    t.end();
});
