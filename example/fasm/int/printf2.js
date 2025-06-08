function printf() { ;2 в bx должен быть адрес ascii строки
    pusha();
    
    ax = 0xb800;
    es = ax;
    si = bx;
    await get_size();

    mov	al,_setcursor
    mov	bl,[col]
    mov	bh,[line]
    int	0xff

    ;в bl;столбик
    ;в bh;рядок
    print:
        lodsb

    or	al,al
    jz	end_of_printf

    cmp	al,_enter
    jnz	_not_enter

    inc	[line]
    mov	[col],0
    cmp	[line],25
    jl	_nopoint2write

    await scroll();

    dec	[line]
    jmp	_nopoint2write

    _not_enter:
        cmp	al,_backspace
    jnz	_not_backspace

    al = 0;
    ah = [mincol];
    cmp(ah, [col]);
    jnz(not_sub_col);
    jmp(_nopoint2write);
    not_sub_col:
        --[col]
    --[col]
    di -= 2;

    _not_backspace:
        mov	ah,[bgcolor]
    shl	ah,4
    add	ah,[textcolor]

    stosw
    inc	[col]
    _nopoint2write:
        mov	al,_setcursor
    mov	bl,[col]
    mov	bh,[line]
    int	0xff

    loop	print
    jmp	end_of_printf

    end_of_printf:
        pop	di
    pop	cx
    pop	bx
    pop	es
    iret();
}


function get_size() {
    push(si);
    cx = -1;
    
    do {
        ++cx;
        lodsb
    } while (al)
    
    pop(si);
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