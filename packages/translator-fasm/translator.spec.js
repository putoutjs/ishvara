import {test} from 'supertape';
import {translate} from '#translator-fasm';

test('ishvara: translator-fasm', async (t) => {
    const [result] = await translate(`
        xor eax, eax
    `);
    
    const expected = new Uint8Array([0x66, 0x31, 0xc0]);
    
    t.deepEqual(result, expected);
    t.end();
});

test('ishvara: translator-fasm: places', async (t) => {
    const [, places] = await translate(`
        (module)
    `);
    
    const expected = [{
        error: 'error: illegal instruction.',
        line: 2,
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
