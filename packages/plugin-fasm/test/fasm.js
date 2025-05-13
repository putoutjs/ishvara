import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['fasm', fasm],
    ],
});

test('plugin-fasm: convert-assign-to-add', (t) => {
    t.transform('convert-assign-to-add');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-assign-to-mov', (t) => {
    t.transform('convert-assign-to-mov');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-assign-to-xor', (t) => {
    t.transform('convert-assign-to-xor');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-assign-to-shl', (t) => {
    t.transform('convert-assign-to-shl');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-function-to-label', (t) => {
    t.transform('convert-function-to-label');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: split-stack-operations', (t) => {
    t.transform('split-stack-operations');
    t.end();
});

test('ishvara: convert-ishvara-to-jasm: convert-await-to-call', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});

test('plugin-fasm: transform: apply-inc', (t) => {
    t.transform('apply-inc');
    t.end();
});

test('plugin-fasm: transform: convert-return-to-eax', (t) => {
    t.transform('convert-return-to-eax');
    t.end();
});

test('plugin-fasm: transform: convert-mov-to-add', (t) => {
    t.transform('convert-mov-to-add');
    t.end();
});

test('plugin-fasm: transform: convert-declaration-to-mov', (t) => {
    t.transform('convert-declaration-to-mov');
    t.end();
});
