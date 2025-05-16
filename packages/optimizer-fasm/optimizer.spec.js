import {test} from 'supertape';
import montag from 'montag';
import {optimize} from './optimizer.js';

test('ishvara: optimizer-fasm', (t) => {
    const [code] = optimize(`
        mov(eax, 1);
    `);
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: optimizer-fasm: xor, mov', (t) => {
    const [code] = optimize(`
        xor(eax, eax);
        mov(eax, 1);
    `);
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});
