import {createTest} from '@ishvara/test';
import {run} from '#emulator-fasm';

const {test} = createTest(import.meta.url, {
    run,
});

test('ishvara: emulator-fasm: x64', async ({compile}) => {
    const expected = 'Hello 64-bit world!\n';
    await compile('x64', expected);
});

