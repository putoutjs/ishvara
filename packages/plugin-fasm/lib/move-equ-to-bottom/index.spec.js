import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-equ-to-bottom', plugin],
    ],
});

test('fasm: move-equ-to-bottom: report', (t) => {
    t.report('move-equ-to-bottom', `Move 'equ' to bottom`);
    t.end();
});

test('fasm: move-equ-to-bottom: transform', (t) => {
    t.transform('move-equ-to-bottom');
    t.end();
});

test('fasm: move-equ-to-bottom: no report after transform', (t) => {
    t.noReportAfterTransform('move-equ-to-bottom');
    t.end();
});

test('fasm: move-equ-to-bottom: no report after transform: top', (t) => {
    t.noReportAfterTransform('top');
    t.end();
});

test('fasm: move-equ-to-bottom: no report after transform: no-equ', (t) => {
    t.noReport('no-equ');
    t.end();
});
