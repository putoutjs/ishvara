export function exec() {
    di = bx
    cx = 3
    al = _find_file
    int(0xff);
    
    if (al)
        return;
    
    // При секридинге максимальный размер ядра 8.5 кб...
    push(cx);

    bx = [exec_addr];
    cx = 12  // track/sector 0/2
    ax = [file_offset];
    al -= 2;
    cx = 0x200
    mul(cx);
    ax += 0x4200
    cwd();
    div(cx);
    // получаем количество секторов в ax
    cx = 18; //дорожка
    cwd();
    div(cx);
    ;в ax номер дорожки
    ;в dx номер сектора на дорожке
    or	dl,dl
    jnz	not_sec1
    ;inc     dl
    not_sec1:
        inc	dl
    mov	cl,dl
    mov	dx,ax;смотрим парная ли дорожка
    push	dx
    push	bx
    mov	bx,2
    cwd
    div	bx
    mov	ch,al;в ch номер дорожки
    mul	bx;если парная - нужно перевернуть
    ;дискетук a.k.a головке один
    pop	bx
    pop	dx
    cmp	dx,1;ax;присвоить
    jnz	not_twin;

    jmp	twin
    not_twin:;не парное число секторов...
    xor	dh,dh;0-левая головка
    jmp	not_twin_ok
    twin:
        mov	dh,1;1-ая головка
    not_twin_ok:
        xor	dl,dl;грузимся с дискетки ;)!

        mov	ah,[file_sec_size]; how much sectors?
        mov	al,_secread;reading the sector

    int	0xff

    pop	cx
    jnc	_find_ok
    clc
    loop	sec_exec_reading
    ;не нашли o_O
    mov	bx,not_f
    mov	al,_printf
    int	0xff

    xor	al,al
    inc	al

    iret
    _find_ok:


        call	[exec_addr];$a000
    xor	al,al

    iret
}
