import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-local-get', plugin],
    ],
});

test('wasm: apply-local-get: report', (t) => {
    t.report('apply-local-get', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('wasm: apply-local-get: transform', (t) => {
    t.transform('apply-local-get');
    t.end();
});
