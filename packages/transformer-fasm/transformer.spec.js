import {test} from 'supertape';
import montag from 'montag';
import {transform} from './transformer.js';

test('ishvara: transformer-fasm', (t) => {
    const [code] = transform(`
        function sum():i32 {
            const eax = 1;
            const ebx = 2;
            
            return eax + ebx;
        }
    `);
    
    const expected = montag`
        __ishvara_sum: {
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
        const sum = (): i32 => {
            const eax = 1;
            const ebx = 2;
            
            return eax + ebx;
        }
    `);
    
    const expected = montag`
        __ishvara_sum: {
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
        function compare(): i32 {
            if (eax === ebx)
                return 5;
            
            return 3;
        }
    `);
    
    const expected = montag`
       __ishvara_compare: {
           cmp(eax, ebx);
           jnz(__ishvara_fasm_if_end_1);
           mov(eax, 5);
           ret();
           __ishvara_fasm_if_end_1: mov(eax, 3);
           ret();
           ret();
       }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: empty config', (t) => {
    const source = montag`
        function compare(): i32 {
            if (eax === ebx)
                return 5;
            
            return 3;
        }
    `;
    
    const config = {};
    const [code] = transform(source, config);
    
    const expected = montag`
       __ishvara_compare: {
           cmp(eax, ebx);
           jnz(__ishvara_fasm_if_end_1);
           mov(eax, 5);
           ret();
           __ishvara_fasm_if_end_1: mov(eax, 3);
           ret();
           ret();
       }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: debug: on', (t) => {
    const source = montag`
        debug('hello');
    `;
    
    const config = {
        debug: true,
    };
    
    const [code] = transform(source, config);
    
    const expected = montag`
        debug(__debug_1_hello);
        (__debug_1_hello.db['hello'], 0xd, 0);
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: debug: on: color', (t) => {
    const source = montag`
        debug('hello');
    `;
    
    const config = {
        debug: true,
        debugText: 3,
        debugColor: 4,
    };
    
    const [code] = transform(source, config);
    
    const expected = montag`
        debug(__debug_1_hello);
        (__debug_1_hello.db['hello'], 0xd, 0);
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('ishvara: transformer-fasm: debug: off', (t) => {
    const source = montag`
        debug('hello');
    `;
    
    const config = {};
    const [code] = transform(source, {
        ...config,
        debug: false,
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});
