import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-return', plugin],
    ],
});

test('wasm: remove-useless-return: report', (t) => {
    t.report('remove-useless-return', `Avoid useless 'return'`);
    t.end();
});

test('wasm: remove-useless-return: transform', (t) => {
    t.transform('remove-useless-return');
    t.end();
});
