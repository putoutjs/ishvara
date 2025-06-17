_secwrite.equ[0xd];
_secread.equ[0xc];
_setminmaxcolline.equ[0xb];
_getcursor.equ[0xa];
_cls.equ[9];
_gets.equ[8];
_setcursor.equ[7];
_color.equ[6];
_find_first.equ[5];
_exec.equ[4];
_find_file.equ[3];
_printf.equ[2];
_get_char.equ[1];
_reboot.equ[0];
_backspace.equ[0xe];
_enter.equ[0xd];
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
line.db[3];

col.db[0];
mincol.db[0];
