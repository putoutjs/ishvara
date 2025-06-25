import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-while-to-jz', plugin],
    ],
});

test('fasm: convert-while-to-jz: report', (t) => {
    t.report('convert-while-to-jz', `Use 'jz' instead of 'while'`);
    t.end();
});

test('fasm: convert-while-to-jz: transform', (t) => {
    t.transform('convert-while-to-jz');
    t.end();
});
