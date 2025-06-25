import {createTest} from './test/create-test.js';

const {test} = createTest(import.meta.url);

test('ishvara: emulator-fasm: x64', async ({compile}) => {
    const expected = 'Hello 64-bit world!\n';
    await compile('x64', expected);
});
