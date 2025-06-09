import {test} from 'supertape';
import montag from 'montag';
import {transform} from './transformer.js';

test('ishvara: transformer-fasm', (t) => {
    const [code] = transform(`
        function add() {
            const eax = 1;
            const ebx = 2;
            
            return eax + ebx;
        }
    `);
    
    const expected = montag`
        __ishvara_add: {
            mov(eax, 1);
            mov(ebx, 2);
            add(eax, ebx);
            ret();
            ret();
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: arrow', (t) => {
    const [code] = transform(`
        const add = () => {
            const eax = 1;
            const ebx = 2;
            
            return eax + ebx;
        }
    `);
    
    const expected = montag`
        __ishvara_add: {
            mov(eax, 1);
            mov(ebx, 2);
            add(eax, ebx);
            ret();
            ret();
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: if', (t) => {
    const [code] = transform(`
        function compare () {
            if (eax === ebx)
                return 5;
            
            return 3;
        }
    `);
    
    const expected = montag`
       __ishvara_compare: {
           cmp(eax, ebx);
           jnz(__ishvara_fasm_if_1);
           mov(eax, 5);
           ret();
           __ishvara_fasm_if_1: mov(eax, 3);
           ret();
           ret();
       }\n
    `;
    
    t.equal(code, expected);
    t.end();
});
