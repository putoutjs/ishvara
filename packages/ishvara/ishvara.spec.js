import {test} from 'supertape';
import montag from 'montag';
import {compile} from './ishvara.js';

test('ishvara: asm', async (t) => {
    const source = 'a = 1';
    const [result] = await compile(source, {
        target: 'asm',
    });
    
    const expected = montag`
        xor a, a
        inc a
        \n
    `;
    
    t.equal(result, expected);
    t.end();
});
