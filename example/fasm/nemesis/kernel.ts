import {org, use16, bios} from '#operator-fasm';
import {printf} from './int/printf.ts';
import {setCursor} from './int/set-cursor.ts';

org(0x7e00);
use16();

_reboot.equ = 0;
_get_char.equ = 1;
_printf.equ = 2;
_find_file.equ = 3;
_exec.equ = 4;
_find_first.equ = 5;
_color.equ = 6;
_setcursor.equ = 7;
_gets.equ = 8;
_cls.equ = 9;
_getcursor.equ = 0xa;
_setminmaxcolline.equ = 0xb;
_secread.equ = 0xc;
_secwrite.equ = 0xd;

function kernel(): iret {
    cli();//подмена прерывания
    push([ax, es]);
    ax = 0;
    es = ax;
    ax = int_table;
    es[0xff * 4] = ax;
    es[0xff * 4 + 2] = cs;

    pop(es);
    pop(ax);
    sti();

    al = _printf;
    bx = hi;
    int(0xff);
    jmp($);

    hi.db = 'hello from Nemizida =)!!!', 0xd, 0

    int_table:
    if (!al)
        bios.reboot();

    if (al === _printf)
        jmp(printf);
    
    if (al === _setcursor)
        jmp(setCursor);

}

section: 'code';



//================= Данные ==========================
minline.db = 0;
maxline.db = 24;
maxcol.db = 79;
textcolor.db = 2;
bgcolor.db = 0;
file_offset.dw = 0;
file_size.dw = 0;
file_sec_size.db = 0;
error_reading.db = 'error reading the file o_O', 0;
exec_addr.dw = $500;
old_ds.dw = 0;
old_es.dw = 0;

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