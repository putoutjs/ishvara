import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-dec-to-hex', plugin],
    ],
});

test('compiler: convert-dec-to-hex: report', (t) => {
    t.report('convert-dec-to-hex', `Use hex index of dec`);
    t.end();
});

test('compiler: convert-dec-to-hex: transform', (t) => {
    t.transform('convert-dec-to-hex');
    t.end();
});

test('compiler: convert-dec-to-hex: no-report-after-transform', (t) => {
    t.noReportAfterTransform('convert-dec-to-hex');
    t.end();
});

test('compiler: convert-dec-to-hex: no report: below-ten', (t) => {
    t.noReport('below-ten');
    t.end();
});
