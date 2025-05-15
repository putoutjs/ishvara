import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-data-address-type', plugin],
    ],
});

test('wasm: apply-data-address-type: report', (t) => {
    t.report('apply-data-address-type', `Apply data address type`);
    t.end();
});

test('wasm: apply-data-address-type: transform', (t) => {
    t.transform('apply-data-address-type');
    t.end();
});
