'use 16';

org(0x7e00);
use16();

const hi = [
    'Hello from Nemesis =)!',
    0xd,
];

const sh3ll = 'SH3LL ';

const not_f = 'sh3ll not found :(!';

cli();
push(ax);
push(es);
mov(ax, 0);
mov(es, ax);
mov(ax, __ishvara_intTable);
es[0xff * 4] = ax;
es[0xff * 4 + 2] = cs;
pop(es);
pop(ax);
sti();
const old_esi: i16 = 0;
const old_ds: i16 = 0;
const exec_addr: i16 = 0x500;
const error_reading2 = 'error reading the file o_O';
const file_sec_size = 0;
const file_size: i16 = 0;
const maxcol = 79;
const maxline = 24;
const minline = 0;
const buf: rb = 0x10;

function get() {
    const eax = 3;
}
