import {bios} from '#operator-fasm';
import {printf} from './printf/index.ts';
import {setCursor} from './set-cursor.ts';

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

export async function intTable(): iret {
    if (!al)
        bios.reboot();

    if (al === _printf) {
        await printf();
        return;
    }

    if (al === _setcursor) {
        await setCursor();
        return;
    }
}
