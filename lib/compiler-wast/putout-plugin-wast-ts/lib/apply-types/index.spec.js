import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-types', plugin],
    ],
});

test('putout-wast-ts: apply-types: report', (t) => {
    t.report('apply-types', `Apply types`);
    t.end();
});

test('putout-wast-ts: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});
