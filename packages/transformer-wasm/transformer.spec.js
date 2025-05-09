import {test} from 'supertape';
import montag from 'montag';
import {transform} from './transformer.js';

test('ishvara: transformer-wasm', (t) => {
    const source = montag`
        function sum(a: i32, b: i32): i32 {
            i32.add(local.get(), local.get());
        }
        
        export {
            sum,
        };
    `;
    
    const [result] = transform(source);
    const expected = montag`
        export function sum(a: i32, b: i32): i32 {
            i32.add(local.get(), local.get());
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});
