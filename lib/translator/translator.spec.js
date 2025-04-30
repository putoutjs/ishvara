import {test} from 'supertape';
import {translate} from '#translator';
import {run} from '#runner';

test('ishvara: translate', async (t) => {
    const binary = await translate(`
        (module
            (func $add (export "add") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
            )
        )
    `);
    
    const {add} = run(binary);
    const result = add(1, 2);
    const expected = 3;
    
    t.equal(result, expected);
    t.end();
});
