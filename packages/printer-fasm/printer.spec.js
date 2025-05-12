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

test('ishvara: printer-fasm: label', (t) => {
    const source = montag`
        boot: jmp.short.start();
    `;
    
    const result = print(source);
    const expected = montag`
        \nboot:
        jmp short start\n\n
    `;
    
    t.equal(result, expected);
    t.end();
});
