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
