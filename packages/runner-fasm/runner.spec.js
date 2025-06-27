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
