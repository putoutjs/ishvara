import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['join-one-byte-registers-assign', plugin],
    ],
});

test('optimizer-fasm: join-one-byte-registers-assign: report', (t) => {
    t.report('join-one-byte-registers-assign', `Assign two-bytes register instead of assigning one-byte registers twice`);
    t.end();
});

test('optimizer-fasm: join-one-byte-registers-assign: transform', (t) => {
    t.transform('join-one-byte-registers-assign');
    t.end();
});

test('optimizer-fasm: join-one-byte-registers-assign: transform: xor', (t) => {
    t.transform('xor');
    t.end();
});

test('optimizer-fasm: join-one-byte-registers-assign: no report: different', (t) => {
    t.noReport('different');
    t.end();
});

