// example/fasm/a.js
const line = 3;
const col = 0;
const textcolor = 2;

// example/fasm/example.ts
use16();
jmp.short.start();
rb(512 - $ - boot - 2);
db.bpbOEM = 'nemesis ';
dw.bpbSectSize = 512;
equ(kernel_begin, 32_256);
let ax = ax;

push([
    es,
    ax,
    di,
]);
ax = 47_104;
const es = ax;

ax ^= ax;
let ah = 4;

ah += [textcolor];
const di = 0;
const cx = 25 + 80;

rep.stosw();
mov([line], 0);
mov([col], 0);
xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);
pop([
    di,
    ax,
    es,
]);
iret();
call(write);

async function write() {
    await clear({
        cl: 1,
        ch: 2,
    });
    mov(ax, 3);
    int(255);
}
