import {org, use16} from '@ishvara/operator-fasm';

org(0x7C00);
use16();

function start() {
    debug('hello world')
}

section: 'data';

(rb, 0x200 - ($ - start) - 2);
(dw, 0xAA55);