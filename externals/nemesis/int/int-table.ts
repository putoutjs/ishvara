import {bios} from '#operator-fasm';
import {printf} from './printf';
import {getCursor, setCursor} from './cursor.ts';
import {clearScreen} from './clear-screen.ts';
import {minMaxColLine} from './position/min-max-col-line.ts';
import {readSector} from './sector.ts';
import {findFile} from './find-file.ts';

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
    
    if (al === _find_file) {
        await findFile();
        return;
    }
    
    if (al === _printf) {
        await printf();
        return;
    }
    
    if (al === _setcursor) {
        await setCursor();
        return;
    }
    
    if (al === _cls) {
        await clearScreen();
        return;
    }
    
    if (al === _setminmaxcolline) {
        await minMaxColLine();
        return;
    }
    
    if (al === _getcursor) {
        await getCursor();
        return;
    }
    
    if (al === _secread) {
        await readSector();
        return;
    }
}
