import {nemesis} from '#operator-fasm';
import {getStringLength} from '../get-string-length.js';
import {
    getLine,
    incLine,
    decLine,
} from './position/line.ts';
import {
    getColumn,
    setColumn,
    decColumn,
    incColumn,
    getMinColumn,
} from './position/column.ts';

_enter.equ = 0xd;
_backspace.equ = 0xe;

export async function printf<es, bx, cx, di>(): iret {// ;2 в bx должен быть адрес ascii строки
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

function scroll() {
    pusha();

    ax = 0xb800
    ds = ax
    es = ax
    si = 80 * 2
    di = 0;
    cx = 80 * 24 * 2
    rep.movsb();

    ax = 0;
    ds = ax;
    ah = [bgcolor];
    ah <<= 4;
    ah += [textcolor]
    cx = 80;
    rep.stosw();
    
    popa();
}

