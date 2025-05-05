import {test} from 'supertape';
import tryCatch from 'try-catch';
import {create} from '#operator-wast';

test('ishvara: operator-wast: create: call', (t) => {
    const imports = [];
    const stack = [];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const [error] = tryCatch(call, 'x');
    
    t.equal(error.message, `[call]: 'x' not found`);
    t.end();
});

test('ishvara: operator-wast: create: fn', (t) => {
    const imports = [];
    const stack = [];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const [error] = tryCatch(call, 'x');
    
    t.equal(error.message, `[call]: 'x' not found`);
    t.end();
});
