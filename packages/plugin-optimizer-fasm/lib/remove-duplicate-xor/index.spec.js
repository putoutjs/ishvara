import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-xor', plugin],
    ],
});

test('optimizer-fasm: remove-duplicate-xor: report', (t) => {
    t.report('remove-duplicate-xor', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('optimizer-fasm: remove-duplicate-xor: transform', (t) => {
    t.transform('remove-duplicate-xor');
    t.end();
});
