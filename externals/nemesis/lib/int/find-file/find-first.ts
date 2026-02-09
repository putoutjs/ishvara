// ложим в bх хендл(номер ;))файла
// в ax будет лежать имя
import {nemesis} from "@ishvara/operator-nemesis";

export async function findFirst() {
    push(bx);

    cx = 3;

    sec_reading_find:
        al = nemesis.readSector({
            count: ah,
            buffer: 0x7c00,
            sector: 2,
            track: 0,
            head: 1,
        });

    if (!al)
        loop(sec_reading_find);

    find_sec_loaded:
        si = 0x7c00 - 0x20;
    cx = 16;              // ← КРИТИЧЕСКИ ВАЖНО

    find_file_search:
        si += 0x20;
    lodsb();
    or(al, al);
    jz(file_not_found1);
    --si;
    loop(find_file_search);

    find_all_good1:
        ax = si;
    pop(bx);
    ret();

    file_not_found1:
        ax = 0;
    pop(bx);
    ret();
}