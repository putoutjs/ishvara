org(0x7e00);
use16();

const hi = [
    'Hello from Nemesis =)!',
    0xd,
];

const sh3ll = 'SH3LL ';

const buf: rb = 0x10;
const not_f = 'sh3ll not found :(!';
const minline = 0;
const maxline = 24;
const maxcol = 79;
const file_offset: i16 = 0;
const file_size: i16 = 0;
const file_sec_size = 0;
const error_reading2 = 'error reading the file o_O';
const old_ds: i16 = 0;
const old_esi: i16 = 0;

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

section: 'data';

function get() {
    const eax = 3;
}

