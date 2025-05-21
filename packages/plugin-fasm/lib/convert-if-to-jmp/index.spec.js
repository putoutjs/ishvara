import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-if-to-jmp', plugin],
    ],
});

test('fasm: convert-if-to-jmp: report', (t) => {
    t.report('convert-if-to-jmp', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('fasm: convert-if-to-jmp: transform', (t) => {
    t.transform('convert-if-to-jmp');
    t.end();
});
