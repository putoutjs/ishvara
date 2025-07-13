import {createTest} from '@ishvara/test';
import {run} from '#runner-fasm';

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

