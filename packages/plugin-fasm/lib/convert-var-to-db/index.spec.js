import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-var-to-db', plugin],
    ],
});

test('compiler: convert-var-to-db: report', (t) => {
    t.report('convert-var-to-db', `Use 'db' instead of 'var'`);
    t.end();
});

test('compiler: convert-var-to-db: transform', (t) => {
    t.transform('convert-var-to-db');
    t.end();
});

test('compiler: convert-var-to-db: transform: let', (t) => {
    t.transform('let');
    t.end();
});
