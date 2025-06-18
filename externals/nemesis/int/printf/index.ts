import {nemesis} from '#operator-fasm';
import {getStringLength} from '../../get-string-length.js';
import {
    getLine,
    incLine,
    decLine,
} from '../position/line.ts';
import {
    getColumn,
    setColumn,
    decColumn,
    incColumn,
    getMinColumn,
} from '../position/column.ts';
import {scroll} from './scroll.ts';

_enter.equ = 0xd;
_backspace.equ = 0xe;

// в bx должен быть адрес ascii строки
export async function printf<es, bx, cx, di>() {
    ax = 0xb800;
    es = ax;
    cx = await getStringLength(bx);
    si = bx;

    do {
        bl = await getColumn();
        bh = await getLine();
        
        nemesis.setCursor({
            column: bl,
            line: bh,
        })
        
        di = ax;

        lodsb();
        
        if (al === _enter) {
            await incLine();
            bl = 0;
            await setColumn();
            
            al = await getLine();
            
            if (al === 25) {
                await scroll();
                await decLine();
            }
            
            continue;
        }
        
        if (al === _backspace) {
            ah = await getColumn();
            al = await getMinColumn();

            if (ah !== al) {
                await decColumn();
                await decColumn();
                di -= 2;
            }
            continue;
        }

        ah = [bgcolor];
        ah <<= 4;
        ah += [textcolor]

        stosw();
        await incColumn();
    } while (--cx);
}
