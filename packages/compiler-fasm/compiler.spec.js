import {test} from 'supertape';
import montag from 'montag';
import {compile} from './compiler.js';

test('ishvara: compiler-fasm: optimized', async (t) => {
    const source = 'mov(eax, 1)';
    const [code] = await compile(source, {
        type: 'optimized',
    });
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: compiler-fasm: optimized: no optimization', async (t) => {
    const source = 'mov(eax, 0x1);\n';
    const [code] = await compile(source, {
        type: 'optimized',
        optimization: false,
    });
    
    t.equal(code, source);
    t.end();
});
