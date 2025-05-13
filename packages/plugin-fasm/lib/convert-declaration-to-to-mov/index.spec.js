import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-declaration-to-to-mov', plugin],
    ],
});

test('fasm: convert-declaration-to-to-mov: report', (t) => {
    t.report('convert-declaration-to-to-mov', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('fasm: convert-declaration-to-to-mov: transform', (t) => {
    t.transform('convert-declaration-to-to-mov');
    t.end();
});
