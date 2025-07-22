import {nemesis} from '@ishvara/operator-fasm';

let count: i16 = 0;
let NEW_LINE = [0xd, 0xd];

export async function dir() {
    [count] = 0;
    do {
        inc([count]);
        ax = nemesis.findFirst([count]);
        
        if (!ax)
            break;
        
        si = ax;
        al = 0;
        mov([si + 0xb], al);
        --si;
        al = 0xd;
        mov([si], al);
        nemesis.printf(si);
    } while (true);
    
    nemesis.printf(NEW_LINE);
}
