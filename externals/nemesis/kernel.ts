import {
    org,
    use16,
    nemesis,
} from '#operator-fasm';
import {intTable} from './int/int-table.ts';

org(0x7e00);
use16();

section: 'const';
cli();
push([ax, es]);

ax = 0;
es = ax;
ax = intTable;

es[0xff * 4] = ax;
es[0xff * 4 + 2] = cs;

pop([es, ax]);
sti();

const shell = 'SH3LL ';
const hi = [
    'Hello from Nemesis =)!',
    0xd,
];

nemesis.printf(hi);
nemesis.exec(shell);

jmp($);

section: 'code';
section: 'data';
let buf: rb = 0x10;
const not_f = 'sh3ll not found :(!';
let file_offset: i16 = 0;
let file_size: i16 = 0;
let file_sec_size = 0;
let error_reading2 = 'error reading the file o_O';
let exec_addr: i16 = 0x500;
let old_ds: i16 = 0;
let old_esi: i16 = 0;
