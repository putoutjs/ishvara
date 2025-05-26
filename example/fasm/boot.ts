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

start: 
ax = 0; // initialize all the necessary
ds = ax;  // registers.
es = ax;
ss = ax;
--ax;
sp = ax;

ax = 3;   // Очистим экран
int(0x10);

push(loader_name);
push(szloader_name - loader_name);
call(printf);

sec_reading:
push(cx);
ah = 2; // reading the sector #2
al = 1; //how much sectors? 1
bx = kernel_begin; // buffer
cl = 2; // sector
ch = 0; // track
dx = 0;
++dh; //головка 1(вторая)
int(0x13);

pop(cx);
jnc(_find_file);

clc();
loop(sec_reading);

push(error_reading);
push(szerror_reading - error_reading);
call(printf);
jmp(reboot);

_find_file:
si = kernel_begin // 0x7e00
bx = si
_find_file_next: di = kernel_name
si = bx;
cx = szkernel_name-kernel_name;
repe.cmpsb();
or(cx, cx);
jnz(_find_file_not)    // строки неравны :(
jmp(find_kernel);
_find_file_not: bx += 0x20;
si = bx;
lodsb();
or(al, al);
jz(_error_finding); //в корне ядра нема :(
jmp(_find_file_next);

find_kernel:

si += 0x14;
lodsw();
[kernel_offset] = ax;
lodsw();
[kernel_size] = ax;
cx = 0x200;
cwd();
div(cx);

or(dx, dx);
jz(bez_ostatka);
++al;

bez_ostatka:
[kernel_sec_size] = al;


push(kernel_fined);
push(szkernel_fined-kernel_fined);
call(printf);

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
or(dl, dl);
jnz(not_sec1);

not_sec1:
++dl
cl = dl; //номер сектора
dx = ax; //смотрим парная ли дорожка
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

not_twin:// ;не парное число секторов...
dh = 0; // левая головка
jmp(not_twin_ok);
twin:
    dh = 1; // 1-ая головка
not_twin_ok:
dl = 0; // грузимся с дискетки ;)!
ah = 2; //_secread;reading the sector
al = [kernel_sec_size]; // how much sectors?
int(0x13);

jnc(_find_kernel);

clc();
pop(cx);
loop(sec_reading2);

push(error_krnlfile);
push(szerror_krnlfile - error_krnlfile);
call(printf);

jmp(reboot);

_find_kernel:
push(kernel_load);
push(szkernel_load-kernel_load);
call(printf);

jmp(kernel_begin);


_error_finding:
push(error_finding);
push(szerror_finding-error_finding);
call(printf);
jmp(reboot);

// Служебные функци o_O
function reboot() {
    push(press_any_key);
    push(szpress_any_key - press_any_key);
    call(printf);
    ax = 0;
    int(0x16) //ждем нажатия на клаву ;)

    jmp.far('0xFFFF:0x0000');
}

function printf() {
    pop(si);
    pop(cx);
    pop(bp);
    push(si);

    // 13(num of func),1 param
    // al = 1  Assign all characters the attribute in BL update cursor
    ax = 0x1301;
    bh = 0;
    bl = 2; //green color ;)
    cwd();
    dh = [line];
    int(0x10);
    [++line];

    if ([line] === 24) {
        [--line];

        ax = 0x601; // Прокрутка вверх на одну строку
        bh = 0x02; // чорный фон, зеленые символы
        cx = 0; // от 00:00
        dx = 0x184f; // 24:79 (весь экран)
        int(0x10);
    }
}

loader_name.db  = 'Nemesis loader'
szloader_name:
error_reading.db = 'error reading';

szerror_reading:
kernel_fined.db = 'kernel find'

szkernel_fined:
error_finding.db = 'error finding the kernel'

szerror_finding:
error_krnlfile.db  = 'error loading kernel';

szerror_krnlfile:
kernel_load.db = 'kernel load successfully';

szkernel_load:
press_any_key.db = 'press any key 4 restart';

szpress_any_key:
kernel_name.db = 'KERNEL';
szkernel_name:
rb, 0x200 - ($ -boot) - 2;
db(0x55, 0xaa);
