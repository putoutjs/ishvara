import {getStringLength} from '../get-string-length.js';

function printf() {// ;2 в bx должен быть адрес ascii строки
    pusha();
    
    ax = 0xb800;
    es = ax;
    cx = await getStringLength(bx);
    si = bx;

    al = _setcursor;
    bl = [col];
    bh = [line];
    int(0xff);

    ;в bl;столбик
    ;в bh;рядок
    print:
    lodsb
    or	al,al
    jz	end_of_printf

    if (al === _enter) {
        ++[line];
        [col] = 0;
        cmp([line], 25);
        jl(_nopoint2write);

        await scroll();

        --[line]
        jmp(_nopoint2write);
    }
    
    if (al === _backspace) {
        al = 0;
        ah = [mincol];

        if (ah === [col])
            jmp(_nopoint2write);

        --[col];
        --[col];
        di -= 2;
    }
    
    ah = [bgcolor];
    ah <<= 4;
    ah += [textcolor]
    stosw();
    ++[col]
    
    _nopoint2write:
    al = _setcursor;
    mov	bl, [col]
    mov	bh, [line]
    int	0xff

    loop(print);
    jmp(end_of_printf);

    end_of_printf:
    popa();
    iret();
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
    shl();
    ah = 4;
    ah += [textcolor]
    cx = 80;
    rep.stosw();
    
    popa();
}