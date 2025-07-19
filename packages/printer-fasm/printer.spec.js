import {test} from 'supertape';
import montag from 'montag';
import {print} from './printer.js';

test('ishvara: printer-fasm', (t) => {
    const source = montag`
        // example/1.wast.ts
        var stack = [];
    `;
    
    const result = print(source);
    const expected = montag`
        var stack = [];\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: label: start', (t) => {
    const source = montag`
        boot: jmp.short.start();
    `;
    
    const result = print(source);
    const expected = montag`
        boot:
        jmp short start\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: label', (t) => {
    const source = montag`
        mov(eax, ebx);
        boot: jmp.short.start();
    `;
    
    const result = print(source);
    const expected = montag`
        mov eax, ebx
        
        boot:
        jmp short start\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: jmp far', (t) => {
    const source = montag`
        jmp.far('0xFFFF:0x0000');
    `;
    
    const result = print(source);
    const expected = montag`
        jmp far 0xFFFF:0x0000\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: jmp far: inside label', (t) => {
    const source = montag`
         __ishvara_reboot: {
            jmp.far('0xFFFF:0x0000');
        }
        (debug_1_reboot.db['reboot'], 0xa, 0);
    `;
    
    const result = print(source);
    const expected = montag`
         __ishvara_reboot:
        jmp far 0xFFFF:0x0000
        debug_1_reboot db 'reboot', 0xa, 0\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: db', (t) => {
    const source = montag`
        kernel_name.db['KERNEL'], 0;
    `;
    
    const result = print(source);
    const expected = montag`
        kernel_name db 'KERNEL', 0\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: db: couple', (t) => {
    const source = montag`
        hi.db['hello from Nemizida =)!!!'], 0xa, 0
    `;
    
    const result = print(source);
    const expected = montag`
        hi db 'hello from Nemizida =)!!!', 0xa, 0\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: AssignmentExpression', (t) => {
    const source = montag`
        es[0xff * 4] = ax;
    `;
    
    const result = print(source);
    const expected = montag`
        mov [es:0xff * 4], ax\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: AssignmentExpression: byte ptr', (t) => {
    const source = montag`
         dl = es[bx];
    `;
    
    const result = print(source);
    const expected = montag`
        mov dl, [es:bx]\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: maxElementLengthInOneLine', (t) => {
    const source = montag`
        mov(al, [
            backgroundColor,
        ]);
    `;
    
    const result = print(source);
    const expected = montag`
        mov al, [backgroundColor]\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: in/out', (t) => {
    const source = montag`
        io.in(al, dx);
        io.out(al, dx);
    `;
    
    const result = print(source);
    const expected = montag`
        in al, dx
        out al, dx\n\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: include', (t) => {
    const source = montag`
        include\`
            int 0xff
        \`;
    `;
    
    const result = print(source);
    const expected = montag`
        int 0xff\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('ishvara: printer-fasm: quotes', (t) => {
    const source = montag`
         (hi.db['Hi, I am Sh3ll. Type \\'help\\' for '], 'more information', 0xd, 0);
    `;
    
    const result = print(source);
    const expected = montag`
        hi db 'Hi, I am Sh3ll. Type ''help'' for ', 'more information', 0xd, 0\n
    `;
    
    t.equal(result, expected);
    t.end();
});
