import {createTest} from '@ishvara/test';
import montag from 'montag';
import {run} from '../lib/runner.js';

const {test} = createTest(import.meta.url, {
    target: 'fasm',
    run,
});

test('ishvara: runner-fasm: x64', async ({compile}) => {
    const expected = 'Hello 64-bit world!\n';
    await compile('x64', expected);
});

test('ishvara: runner-fasm: sum', async ({compile}) => {
    const expected = '3';
    await compile('sum', expected);
});

test('ishvara: runner-fasm: boot', async ({compile}) => {
    const expected = 'Hello World';
    await compile('boot', expected);
});

test('ishvara: runner-fasm: debug', async ({compile}) => {
    const expected = 'hello world\n';
    await compile('debug', expected);
});

test('ishvara: runner-fasm: include', async ({compile}) => {
    const expected = montag`
        begin
        secread: start
        secread: before wait
    
    `;
    
    await compile('include', expected);
});

test.only('ishvara: runner-fasm: x64', async ({compile}) => {
    const expected = 'Hello 64-bit world!\n';
    await compile('strcmp', expected);
});
