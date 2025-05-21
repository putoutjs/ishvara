import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-labeled-block', plugin],
    ],
});

test('fasm: extract-labeled-block: report', (t) => {
    t.report('extract-labeled-block', `Extract 'labeled' block'`);
    t.end();
});

test('fasm: extract-labeled-block: transform', (t) => {
    t.transform('extract-labeled-block');
    t.end();
});
