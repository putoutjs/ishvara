org(31744);
use16();
boot: jmp.short.start();
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

equ(kernel_begin, 0x7e00);

start: xor(ax, ax); // initialize all the necessary
mov(ds, ax);  // registers.
mov(es, ax);
mov(ss, ax);
dec(ax);
mov(sp, ax);

mov(ax, 3);   // Очистим экран
int(0x10);

push(loader_name);
push(szloader_name - loader_name);
call(printf);

function printf() {
    pop(si);
    pop(cx);
    pop(bp);
    push(si);

    bh ^= bh;
    // 13(num of func),1 param
    // al = 1  Assign all characters the attribute in BL update cursor
    ax = 0x1301;
    bl = 2; //green color ;)
    cwd();

    dh = [line];
    int(0x10);
    [++line];

    if ([line] === 24) {
        [--line];

        ax = 0x601; // Прокрутка вверх на одну строку
        bh = 0x02; // чорный фон, зеленые символы
        cx ^= cx; // от 00:00
        dx = 0x184f; // 24:79 (весь экран)
        int(0x10);
    }
}

loader_name.db  = 'Nemesis loader'
szloader_name:
error_reading.db = 'error reading';