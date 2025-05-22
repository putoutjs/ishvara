import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-if-to-jmp', plugin],
    ],
});

test('fasm: convert-if-to-jmp: report', (t) => {
    t.report('convert-if-to-jmp', `Use 'jmp' instead of 'if'`);
    t.end();
});

test('fasm: convert-if-to-jmp: transform', (t) => {
    t.transform('convert-if-to-jmp');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: equility', (t) => {
    t.transform('equility');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: else', (t) => {
    t.transform('else');
    t.end();
});

