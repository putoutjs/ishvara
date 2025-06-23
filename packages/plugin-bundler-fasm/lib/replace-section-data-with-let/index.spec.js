import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['replace-section-data-with-let', plugin],
    ],
});

test('bundler-fasm: replace-section-data-with-let: report', (t) => {
    t.report('replace-section-data-with-let', `Replace section 'data' with 'equ'`);
    t.end();
});

test('bundler-fasm: replace-section-data-with-let: transform', (t) => {
    t.transform('replace-section-data-with-let');
    t.end();
});

test('bundler-fasm: replace-section-data-with-let: no report: const', (t) => {
    t.noReport('const');
    t.end();
});
