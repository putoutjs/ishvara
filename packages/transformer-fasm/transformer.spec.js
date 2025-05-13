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
            mov(eax, 0x1);
            mov(ebx, 0x2);
            
            add(eax, ebx);
            ret;
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});
