import {nemesis} from '@ishvara/operator-fasm';
import {setFileSecSize} from './file-sec-size';
import {setFileOffset} from './file-offset';

let file_size: i16 = 0;

let MSG_FIND_FILE_READ_SECTOR = [
    'find file: read sector',
    0xd,
];

let MSG_NOT_EMPTY_READ_RESULT = [
    'find file: read sector: not empty read result',
    0xd,
];

let MSG_EMPTY_READ_RESULT = [
    'find file: read sector: empty read result',
    0xd,
];

// Считываем сектор, в котором находятся записи об
// именах файлах и данных о них и ищем название
export async function findFile() {
    cx = 3;
    di = bx;
    push(di);
    push(bx);
    do {
        push(cx);
        nemesis.printf(MSG_FIND_FILE_READ_SECTOR);
        al = nemesis.readSector({
            count: 1,
            buffer: 0x7c00,
            sector: 2,
            track: 0,
            head: 1,
        });
        
        if (!al) {
            nemesis.printf(MSG_EMPTY_READ_RESULT);
            break;
        }
        
        nemesis.printf(MSG_NOT_EMPTY_READ_RESULT);
        
        pop(cx);
    } while (--cx);
    
    if (al) {
        pop(di);
        pop(cx);
        al = 0;
        
        return;
    }
    
    si = 0x7c00;
    find_file_in_fat: pop(di);
    push(di);
    push(si);
    
    _strcmp: lodsb();
    cmp([di], al);
    jnz(_strcmp_end);
    ++di;
    jmp(_strcmp);
    // не нашли если
    _strcmp_end: pop(si);
    cmp(al, 0x20);
    jnz(not_equal);
    al = 0;
    not_equal: or(al, al);
    jz(find_all_good);
    si += 0x20;
    lodsb();
    or(al, al);
    jz(file_not_found);
    --si;
    jmp(find_file_in_fat);
    
    find_all_good: si += 0x1a;
    lodsw();
    await setFileOffset();
    lodsw();
    [file_size] = ax;
    bx = 0x200;
    cwd();
    div(bx);
    or(dl, dl);
    jz(_dl0);
    ++al;
    _dl0: await setFileSecSize();
    pop(di);
    pop(cx);
    al = 0;
    ret;
    // нашли =)!!!
    file_not_found: pop(di);
    pop(cx);
    
    al = 1; // Ничего не нашли o_O ...
}
