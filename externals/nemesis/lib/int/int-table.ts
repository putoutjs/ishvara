import {bios} from '#operator-fasm';
import {printf} from './printf';
import {getCursor, setCursor} from './cursor.ts';
import {clearScreen} from './clear-screen.ts';
import {minMaxColLine} from './position/min-max-col-line.ts';
import {readSector} from './sector.ts';
import {findFile} from './find-file.ts';

const _reboot = 0;
const _get_char = 1;
const _printf = 2;
const _find_file = 3;
const _exec = 4;
const _find_first = 5;
const _color = 6;
const _setcursor = 7;
const _gets = 8;
const _cls = 9;
const _getcursor = 0xa;
const _setminmaxcolline = 0xb;
const _secread = 0xc;
const _secwrite = 0xd;

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
