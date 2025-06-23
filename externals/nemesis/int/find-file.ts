import {nemesis} from '@ishvara/operator-fasm';

let file_offset: i16 = 0;
let file_size: i16 = 0;
let file_sec_size = 0;

export async function findFile() {
    // Считываем сектор, в котором находятся записи об
    // именах файлах и данных о них и ищем название
    di = bx;
    push(di);
    push(bx);
    do {
        push(cx);
        al = nemesis.readSector({
            count: 1,
            buffer: 0x7c00,
            sector: 2,
            track: 0,
            head: 1,
        });
        
        if (!al)
            break;
        
        pop(cx);
    } while (--cx);
    
    if (al) {
        pop(di);
        pop(cx);
        al = 0;
        
        return;
    }
    
    si = 0x7c00;
    find_file_in_fat:
    pop(di);
    push(di);
    push(si);
    
    _strcmp:
    lodsb();
    cmp([di], al);
    jnz(_strcmp_end);
    ++di;
    jmp(_strcmp);
    // не нашли если
    _strcmp_end:
    pop(si);
    
    cmp(al, 0x20);
    jnz(not_equal);
    al = 0;
    not_equal:
    or(al, al);
    jz(find_all_good);
    si += 0x20;
    lodsb();
    or(al, al);
    jz(file_not_found);
    --si;
    jmp(find_file_in_fat);
    
    find_all_good:
    si += 0x1a;
    lodsw();
    [file_offset] = ax;
    lodsw();
    [file_size] = ax;
    bx = 0x200;
    cwd();
    div(bx);
    or(dl, dl);
    jz(_dl0);
    ++al;
    _dl0:
    [file_sec_size] = al;
    pop(di);
    pop(cx);
    al = 0;
    ret;
    // нашли =)!!!
    file_not_found:
    pop(di);
    pop(cx);
    
    al = 1; // Ничего не нашли o_O ...
}
