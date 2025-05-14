import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-declarations', plugin],
    ],
});

test('fasm: remove-useless-declarations: report', (t) => {
    t.report('remove-useless-declarations', `Avoid useless import of '#operator-fasm'`);
    t.end();
});

test('fasm: remove-useless-declarations: transform', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});
