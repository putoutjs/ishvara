import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertDoWhileToJnz from '../convert-do-while-to-jnz/index.js';

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

test('fasm: convert-if-to-jmp: transform: equality', (t) => {
    t.transform('equality');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: block-last', (t) => {
    t.transform('block-last');
    t.end();
});

test('ishvara: plugin-fasm: convert-if-to-jmp: transform: block-pop', (t) => {
    t.transform('block-pop');
    t.end();
});

test('ishvara: plugin-fasm: convert-if-to-jmp: transform: not-equal', (t) => {
    t.transform('not-equal');
    t.end();
});

test('ishvara: plugin-fasm: convert-if-to-jmp: transform: no-block', (t) => {
    t.transform('no-block');
    t.end();
});

test('ishvara: plugin-fasm: convert-if-to-jmp: transform: convert-do-while-to-jnz', (t) => {
    t.transform('convert-do-while-to-jnz', {
        convertDoWhileToJnz,
    });
    t.end();
});
