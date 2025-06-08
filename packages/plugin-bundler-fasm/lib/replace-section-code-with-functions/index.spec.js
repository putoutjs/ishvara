import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-functions-before-data', plugin],
    ],
});

test('bundler-fasm: move-functions-before-data: report', (t) => {
    t.report('move-functions-before-data', `Replace section 'code' with functions`);
    t.end();
});

test('bundler-fasm: move-functions-before-data: transform', (t) => {
    t.transform('move-functions-before-data');
    t.end();
});
