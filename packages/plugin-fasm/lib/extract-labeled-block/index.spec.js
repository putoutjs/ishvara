import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-labeled-block', plugin],
    ],
});

test('fasm: extract-labeled-block: report', (t) => {
    t.report('extract-labeled-block', `Extract 'labeled' block: '__ishvara_fasm_if_6'`);
    t.end();
});

test('fasm: extract-labeled-block: transform', (t) => {
    t.transform('extract-labeled-block');
    t.end();
});

test('fasm: extract-labeled-block: no report: nested-labels', (t) => {
    t.noReport('nested-labels');
    t.end();
});
