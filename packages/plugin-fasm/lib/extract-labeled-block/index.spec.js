import {createTest} from '@putout/test';
import * as splitAssignAwaitWithAssignEax from '../split-assign-await-with-assign-eax/index.js';
import * as convertDoWhileToJnz from '../convert-do-while-to-jnz/index.js';
import * as convertFunctionToLabel from '../convert-function-to-label/index.js';
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

test('fasm: extract-labeled-block: transform: nested-labels', (t) => {
    t.transform('nested-labels');
    t.end();
});

test('fasm: extract-labeled-block: transform: convert-do-while-to-jnz', (t) => {
    t.transform('convert-do-while-to-jnz', {
        splitAssignAwaitWithAssignEax,
        convertDoWhileToJnz,
        convertFunctionToLabel,
    });
    t.end();
});
