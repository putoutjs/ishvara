import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-ret', plugin],
    ],
});

test('optimizer-fasm: remove-useless-ret: report', (t) => {
    t.report('remove-useless-ret', `Avoid useless 'ret'`);
    t.end();
});

test('optimizer-fasm: remove-useless-ret: transform', (t) => {
    t.transform('remove-useless-ret');
    t.end();
});

test('optimizer-fasm: remove-useless-ret: transform: after-jmp', (t) => {
    t.transform('after-jmp');
    t.end();
});

