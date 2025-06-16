import {test} from 'supertape';
import {parseArgs} from './parse-args.js';

test('ishvara: cli-args: parse-args', (t) => {
    const result = parseArgs([
        '-o',
        'assembly',
        '-t',
        'fasm',
    ]);
    
    const expected = {
        _: [],
        o: 'assembly',
        output: 'assembly',
        t: 'fasm',
        target: 'fasm',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
