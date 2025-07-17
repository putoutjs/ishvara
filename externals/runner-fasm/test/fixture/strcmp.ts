import {linux} from '@ishvara/operator-fasm';
import {strcmp} from './strcmp/strcmp.ts';

format.ELF64.executable;
segment.readable.executable;
entry.$;

let a = 'hello';
let b = 'world';

let EQUAl = 'equal';
let NOT_EQUAl = 'not equal';

let result: i64 = 0;

al = await strcmp(a, a);

if (!al)
    linux.write({
        message: a,
    })

al = await strcmp(a, b);

if (al)
    linux.write({
        message: NOT_EQUAl,
        length: 5,
    })

else
    linux.write({
        message: EQUAl,
        length: 1,
    })

linux.exit(0);

section: 'code';
segment.readable.writeable;
section: 'data';
