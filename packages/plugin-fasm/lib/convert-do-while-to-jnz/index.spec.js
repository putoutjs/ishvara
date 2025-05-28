import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-do-while-to-jz', plugin],
    ],
});

test('fasm: convert-do-while-to-jz: report', (t) => {
    t.report('convert-do-while-to-jz', `Use 'jnz' instead of 'do-while'`);
    t.end();
});

test('fasm: convert-do-while-to-jz: transform', (t) => {
    t.transform('convert-do-while-to-jz');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: al', (t) => {
    t.transform('al');
    t.end();
});

