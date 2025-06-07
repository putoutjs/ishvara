import {bios} from "#operator-fasm";
import {getStringLength} from './get-string-length.js'

export async function printf() {
    pop(si);
    pop(bp);
    push(si);
    cx = await getStringLength(bp);

    bh = 0;
    bl = 2; // green color ;)
    dl = 0;
    dh = [line];
    bios.printLine();
    if (dh === 23) {
        bh = 0x02; // чорный фон, зеленые символы
        bios.scroll();
        return;
    }

    ++dh;
    [line] = dh;
}