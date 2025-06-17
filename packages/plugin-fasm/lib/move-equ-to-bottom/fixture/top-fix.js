_enter.equ[0xd];
_backspace.equ[0xe];
_reboot.equ[0];
_get_char.equ[1];
_printf.equ[2];
_find_file.equ[3];
_exec.equ[4];
_find_first.equ[5];
_color.equ[6];
_setcursor.equ[7];
_gets.equ[8];
_cls.equ[9];
_getcursor.equ[0xa];
_setminmaxcolline.equ[0xb];
_secread.equ[0xc];
_secwrite.equ[0xd];
org(0x7e00);
use16();

__ishvara_kernel: {
    cli(); //подмена прерывания
    push(ax);
    push(es);
    mov(ax, 0);
    mov(es, ax);
    mov(ax, __ishvara_intTable);
    es[0xff * 4] = ax;
    es[0xff * 4 + 2] = cs;
    
    pop(es);
    pop(ax);
    sti();
    mov(al, 2);
    mov(bx, hi);
    int(0xff);
    jmp($);
    
    (hi.db['Hello from Nemesis =)!'], 0xd, 0);
    ret();
}
__ishvara_intTable: {
    cmp(al, 0);
    jnz(__ishvara_fasm_if_1);
    jmp.far('0xFFFF:0x0000');
    __ishvara_fasm_if_1: cmp(al, _printf);
    jnz(__ishvara_fasm_if_2);
    call(__ishvara_printf);
    ret();
    __ishvara_fasm_if_2: nop();
    cmp(al, _setcursor);
    jnz(__ishvara_fasm_if_3);
    call(__ishvara_setCursor);
    ret();
    __ishvara_fasm_if_3: iret();
}
__ishvara_setCursor: {
    push(es);
    push(dx);
        // ;bx = offset
    mov(ax, 0xb800);
    mov(es, ax);
        // в bl;столбик
    call(__ishvara_setColumn);
        // в bh;рядок
    call(__ishvara_setLine);
    
    mov(al, bl);
    mov(ah, 0);
    mov(bh, 0);
    
    mov(dx, 0x50);
        // calculate y offset
    mul(dx);
    add(bx, ax);
        // select to write low byte of index
    mov(al, 0xf);
    mov(dx, 0x03d4);
    out(dx, al);
        // write it
    mov(al, bl);
    mov(dx, 0x03d5);
    out(dx, al);
        // select to write high byte of index
    mov(al, 0xe);
    mov(dx, 0x03d4);
    out(dx, al);
        // write it
    mov(al, bh);
    mov(dx, 0x03d5);
    out(dx, al);
    
    mov(dx, 0);
    mov(ax, 0);
    call(__ishvara_getLine);
    mov(dl, al);
    imul(dx, 0x50 * 2);
    mov(di, dx);
    call(__ishvara_getColumn);
    mov(al, al);
    imul(ax, 2);
    add(di, ax);
    pop(dx);
    pop(es);
    mov(ax, di);
    ret();
    iret();
}
// в bx должен быть адрес ascii строки
__ishvara_printf: {
    push(es);
    push(bx);
    push(cx);
    push(di);
    mov(ax, 0xb800);
    mov(es, ax);
    push(bx);
    call(__ishvara_getStringLength);
    mov(cx, ax);
    mov(si, bx);
    __ishvara_do_while_121: call(__ishvara_getColumn);
    mov(bl, al);
    call(__ishvara_getLine);
    mov(bh, al);
    mov(bl, bl);
    mov(bh, bh);
    mov(al, 7);
    int(0xff);
    mov(di, ax);
    
    lodsb();
    cmp(al, _enter);
    jnz(__ishvara_fasm_if_4);
    call(__ishvara_incLine);
    mov(bl, 0);
    call(__ishvara_setColumn);
    call(__ishvara_getLine);
    mov(al, al);
    cmp(al, 0x19);
    jnz(__ishvara_fasm_if_5);
    call(__ishvara_scroll);
    call(__ishvara_decLine);
    __ishvara_fasm_if_5: jmp(__ishvara_do_while_condition_121);
    __ishvara_fasm_if_4: cmp(al, _backspace);
    jnz(__ishvara_fasm_if_6);
    call(__ishvara_getColumn);
    mov(ah, al);
    call(__ishvara_getMinColumn);
    mov(al, al);
    cmp(ah, al);
    jz(__ishvara_fasm_if_7);
    call(__ishvara_decColumn);
    call(__ishvara_decColumn);
    sub(di, 2);
    __ishvara_fasm_if_7: jmp(__ishvara_do_while_condition_121);
    __ishvara_fasm_if_6: nop();
    mov(ah, [bgcolor]);
    shl(ah, 4);
    add(ah, [textcolor]);
    
    stosw();
    call(__ishvara_incColumn);
    __ishvara_do_while_condition_121: loop(__ishvara_do_while_121);
    pop(di);
    pop(cx);
    pop(bx);
    pop(es);
    ret();
}
__ishvara_scroll: {
    pusha();
    
    mov(ax, 0xb800);
    mov(ds, ax);
    mov(es, ax);
    mov(si, 0x50 * 2);
    mov(di, 0);
    mov(cx, 0x50 * 0x18 * 2);
    rep.movsb();
    
    mov(ax, 0);
    mov(ds, ax);
    mov(ah, [bgcolor]);
    shl(ah, 4);
    add(ah, [textcolor]);
    mov(cx, 0x50);
    rep.stosw();
    
    popa();
    ret();
}
__ishvara_getMinColumn: {
    mov(al, [mincol]);
    ret();
    ret();
}
__ishvara_setColumn: {
    mov([col], bl);
    ret();
}
__ishvara_decColumn: {
    dec([col]);
    ret();
}
__ishvara_incColumn: {
    inc([col]);
    ret();
}
__ishvara_getColumn: {
    mov(al, [col]);
    ret();
    ret();
}
__ishvara_setLine: {
    mov([line], bh);
    ret();
}
__ishvara_decLine: {
    dec([line]);
    ret();
}
__ishvara_incLine: {
    inc([line]);
    ret();
}
__ishvara_getLine: {
    mov(al, [line]);
    ret();
    ret();
}
__ishvara_getStringLength: {
    pop(ax);
    pop(si);
    push(ax);
    mov(cx, -1);
    cld();
    
    __ishvara_do_while_236: lodsb();
    inc(cx);
    test(al, al);
    jnz(__ishvara_do_while_236);
    mov(ax, cx);
    ret();
    ret();
}
//================= Данные ==========================
minline.db[0];
maxline.db[0x18];
maxcol.db[0x4f];
textcolor.db[2];
bgcolor.db[0];
file_offset.dw[0];
file_size.dw[0];
file_sec_size.db[0];
(error_reading.db['error reading the file o_O'], 0);
exec_addr.dw[$500];
old_ds.dw[0];
old_es.dw[0];
///ascii_pic db '      __________',$d
///          db   ".'`   |     |`'.",$d
///          db   "|     '-----'  |",$d
///          db   "|              |",$d
///          db   "|  .--------.  |",$d
///          db   "|  |n3m1z1d4|  |",$d
///          db   "|  |-- OS --|  |",$d
///          db   "|  |--0.01--|  |",$d
///          db   "|  ;--------;  |",$d
///
line.db[3];

col.db[0];
mincol.db[0];
