import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-jz-to-jmp', plugin],
    ],
});

test('optimizer-fasm: convert-jz-to-jmp: report', (t) => {
    t.report('convert-jz-to-jmp', `Avoid useless 'jz'`);
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform', (t) => {
    t.transform('convert-jz-to-jmp');
    t.end();
});
