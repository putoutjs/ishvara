import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyEquality from '../apply-equality/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-vars-to-bottom', plugin],
    ],
});

test('compiler: move-vars-to-bottom: report', (t) => {
    t.report('move-vars-to-bottom', `Move 'var' to bottom of the file`);
    t.end();
});

test('compiler: move-vars-to-bottom: transform', (t) => {
    t.transform('move-vars-to-bottom');
    t.end();
});

test('compiler: move-vars-to-bottom: no report: array', (t) => {
    t.noReport('array');
    t.end();
});

test('compiler: move-vars-to-bottom: no report: function', (t) => {
    t.noReport('function');
    t.end();
});

test('compiler: move-vars-to-bottom: no report: block', (t) => {
    t.noReport('block');
    t.end();
});

test('compiler: move-vars-to-bottom: transform: apply-equality', (t) => {
    t.transform('apply-equality', [
        ['apply-equality', applyEquality],
    ]);
    t.end();
});
