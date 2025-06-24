import {bios} from '@ishvara/operator-fasm';

const str = 'hello';

{
    push(bp);
    ax = 0x1301;
    bh = 0;
    bl = 2;
    cx = 0;
    dh = [line];
    dl = 0;
    bp = str;
    int(0x10);
    pop(bp);
}
