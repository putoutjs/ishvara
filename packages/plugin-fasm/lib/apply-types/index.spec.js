import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-types', plugin],
    ],
});

test('fasm: apply-types: report', (t) => {
    t.report('apply-types', `Use 'db' instead of 'i8'`);
    t.end();
});

test('fasm: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});

test('fasm: apply-types: transform: i64', (t) => {
    t.transform('i64');
    t.end();
});

test('fasm: apply-types: no report: ureg', (t) => {
    t.noReport('ureg');
    t.end();
});
