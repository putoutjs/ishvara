import {test} from 'supertape';
import montag from 'montag';
import {compile} from './compiler.js';

test('ishvara: compiler-wasm', async (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
        }
    `;
    
    const [result] = await compile(source, {
        type: 'assembly',
    });
    
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});
