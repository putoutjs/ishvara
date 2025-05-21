import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-i32-const', plugin],
    ],
});

test('wasm: apply-i32-const: report', (t) => {
    t.report('apply-i32-const', `Use 'i32.const()'`);
    t.end();
});

test('wasm: apply-i32-const: transform', (t) => {
    t.transform('apply-i32-const');
    t.end();
});

test('wasm: apply-i32-const: transform: i32-eq', (t) => {
    t.transform('i32-eq');
    t.end();
});

test('wasm: apply-i32-const: no report: memory', (t) => {
    t.noReport('memory');
    t.end();
});
