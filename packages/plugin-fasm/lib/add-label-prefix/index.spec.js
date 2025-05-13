import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-label-prefix', plugin],
    ],
});

test('fasm: add-label-prefix: report', (t) => {
    t.report('add-label-prefix', `Add prefix to label: 'add' -> '__ishvara_add'`);
    t.end();
});

test('fasm: add-label-prefix: transform', (t) => {
    t.transform('add-label-prefix');
    t.end();
});

test('fasm: add-label-prefix: no report after transform', (t) => {
    t.noReportAfterTransform('add-label-prefix');
    t.end();
});
