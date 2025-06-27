import {createTest} from '@ishvara/test';
import {run} from '#runner-wasm';

const {test} = createTest(import.meta.url, {
    run,
    target: 'wasm',
});

test('ishvara: runner-wasm: sum', async ({compile}) => {
    const expected = '3';
    await compile('sum', expected, 'entry', [1, 2]);
});
