import {io} from '@ishvara/operator-fasm';

__ishvara_do_while_3: {
    io.in(al, 0x60);
    cmp(al, 250);
    jz(__ishvara_do_while_3);
}
