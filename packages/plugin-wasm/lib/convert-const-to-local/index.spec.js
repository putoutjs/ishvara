import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-const-to-local', plugin],
    ],
});

test('wasm: convert-const-to-local: report', (t) => {
    t.report('convert-const-to-local', `Use 'local' instead of 'const'`);
    t.end();
});

test('wasm: convert-const-to-local: transform', (t) => {
    t.transform('convert-const-to-local');
    t.end();
});
