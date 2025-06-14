import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-arguments-to-registers', plugin],
    ],
});

test('fasm: convert-arguments-to-registers: report', (t) => {
    t.report('convert-arguments-to-registers', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('fasm: convert-arguments-to-registers: transform', (t) => {
    t.transform('convert-arguments-to-registers');
    t.end();
});
