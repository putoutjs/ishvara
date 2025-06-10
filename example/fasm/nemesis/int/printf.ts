import {getStringLength} from '../get-string-length.js';

export async function printf<es, bx, cx, di>(): iret {// ;2 в bx должен быть адрес ascii строки
    ax = 0xb800;
    es = ax;
    cx = await getStringLength(bx);
    si = bx;

    al = _setcursor;
    bl = [col];
    bh = [line];
    int(0xff);

    // в bl;столбик
    // в bh;рядок
    print:
    lodsb();
    
    if (al !== 0) {
        if (al === _enter) {
            inc([line]);
            [col] = 0;
            cmp([line], 25);
            jl(_nopoint2write);

            await scroll();

            dec([line]);
            jmp(_nopoint2write);
        }

        if (al === _backspace) {
            al = 0;
            ah = [mincol];

            if (ah === [col])
                jmp(_nopoint2write);

            dec([col]);
            dec([col]);
            di -= 2;
        }

        ah = [bgcolor];
        ah <<= 4;
        ah += [textcolor]
        stosw();
        inc([col]);

        _nopoint2write:
        al = _setcursor;
        bl = [col];
        bh = [line];
        int(0xff);

        loop(print);
    }
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