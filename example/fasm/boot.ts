import {org, use16, bios} from '#operator-fasm';

org(0x7c00);
use16();
boot: jmp(start);
line.db = 0;

// Standard BIOS Parameter Block, "BPB".   ;
bpbOEM.db  = 'nemesis ';
bpbSectSize.dw = 512;
bpbClustSize.db = 1;
bpbReservedSec.dw = 1;
bpbFats.db = 2;
bpbRootSize.dw = 224;
bpbTotalSect.dw = 2880;
bpbMedia.db = 240;
bpbFatSize.dw = 9;
bpbTrackSect.dw = 18;
bpbHeads.dw = 2;
bpbHiddenSect.dd = 0;
kernel_offset.dw = 0;
kernel_size.dw = 0;

// extended BPB for FAT12/FAT16   ;
bpbDriveNo.db = 0;
kernel_sec_size.db = 0;
bpbSignature.db = 41; // 0 = nothing more. 41 = three more (below)..;
bpbID.dd = 1;
bpbVolumeLabel.db = 'BOOT FLOPPY';
bpbFileSystem.db = 'FAT12   ';

kernel_begin.equ = 0x7e00;

async function start() {
    ax = 0; // initialize all the necessary
    ds = ax; // registers.
    es = ax;
    ss = ax;
    --ax;
    sp = ax;

    bios.clearScreen();

    await printf(loader_name);

    sec_reading:
    al = 1; // how much sectors? 1
    bx = kernel_begin; // buffer
    cl = 2; // sector
    ch = 0; // track
    dx = 0;
    ++dh; //головка 1(вторая)
    ax = bios.readSector();
    
    if (ax) {
        await printf(error_reading)
        await rebootAfterKeyPress();
        return;
    }
    
    find_file:
    bx = kernel_begin // 0x7e00
    
    find_file_next:
    di = kernel_name;
    ax = await getStringLength(di);
    cx = strncmp(bx, di, ax);
    
    if (cx) {
        bx += 0x20;
        si = bx;
        lodsb();
        if (!al) {
            // в корне ядра нет :(
            await printf(error_finding);
            await rebootAfterKeyPress();
            return;
        }
        
        jmp(find_file_next);
        return;
    }
    
    find_kernel:
    si += 0x14;
    lodsw();
    [kernel_offset] = ax;
    lodsw();
    [kernel_size] = ax;
    cx = 0x200;
    cwd();
    div(cx);

    if (dx)
        ++al;

    [kernel_sec_size] = al;
    await printf(kernel_found);

    cx = 3
    // Грузим ядро
    sec_reading2:
    push(cx);

    bx = kernel_begin; // ;$a000 ;buffer
    ax = [kernel_offset];
    al -= 2;
    cx = 0x200; //track/sector 0/2
    mul(cx);
    ax += 0x4200;
    cwd(); // необязательно... но, мало ли... лучше
    div(cx) // пропишем, что б потом неожиданностей небыло...
    // получаем количество секторов в ax
    cx = 18; //дорожка
    cwd();
    div(cx);
    // в ax номер дорожки
    // в dx номер сектора на дорожке
    ++dl
    cl = dl; // номер сектора
    dx = ax; // смотрим парная ли дорожка
    push(dx);
    push(bx);
    bx = 2;
    cwd();
    div(bx);
    ch = al;// в ch номер дорожки
    mul(bx); // если парная - нужно перевернуть
    // дискетук a.k.a головке один
    pop(bx);
    pop(dx);
    cmp(dx, 1); //ax;присвоить
    jnz(not_twin);

    jmp(twin);

    not_twin: // не парное число секторов...
    dh = 0; // левая головка
    jmp(not_twin_ok);
    
    twin:
    dh = 1; // 1-ая головка
    
    not_twin_ok:
    dl = 0; // грузимся с дискетки ;)!
    al = [kernel_sec_size]; // how much sectors?
    bios.readSector();

    if (ax) {
        pop(cx);
        loop(sec_reading2);

        await printf(error_krnlfile);
        await rebootAfterKeyPress();
        return;
    }

    await printf(kernel_load);
    jmp(kernel_begin);
}

// Служебные функци o_O
async function rebootAfterKeyPress() {
    await printf(press_any_key);
    // ждем нажатия на клаву ;)
    bios.readChar();
    bios.reboot();
}

async function printf() {
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

function getStringLength() {
    pop(ax)
    pop(si);
    push(ax);
    cx = -1;

    do {
        lodsb();
        ++cx;
    } while (al)

    return cx;
}

loader_name.db  = 'Nemesis Loader o_O', 0;
error_reading.db = 'error: read', 0;
kernel_found.db = '+kernel found', 0;
error_finding.db = 'error: kernel not found', 0;
error_krnlfile.db  = 'kernel not load', 0;
kernel_load.db = '+kernel load', 0;
press_any_key.db = 'press any key', 0;
kernel_name.db = 'KERNEL', 0;

rb, 0x200 - ($ - boot) - 2;
db(0x55, 0xaa);
