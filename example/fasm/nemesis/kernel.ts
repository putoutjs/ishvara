import {org, use16, nemesis} from '#operator-fasm';
import {intTable} from './int/int-table.ts'

org(0x7e00);
use16();

cli();//подмена прерывания
push([ax, es]);

ax = 0;
es = ax;
ax = intTable;
es[0xff * 4] = ax;
es[0xff * 4 + 2] = cs;

pop([es, ax])
sti();

nemesis.printf(hi);
jmp($);

hi.db = 'Hello from Nemesis =)!', 0xd, 0

section: 'code';

//================= Данные ==========================
minline.db = 0;
maxline.db = 24;
maxcol.db = 79;
textcolor.db = 2;
bgcolor.db = 0;
file_offset.dw = 0;
file_size.dw = 0;
file_sec_size.db = 0;
error_reading.db = 'error reading the file o_O', 0;
exec_addr.dw = $500;
old_ds.dw = 0;
old_es.dw = 0;

///ascii_pic db '      __________',$d
///          db   ".'`   |     |`'.",$d
///          db   "|     '-----'  |",$d
///          db   "|              |",$d
///          db   "|  .--------.  |",$d
///          db   "|  |n3m1z1d4|  |",$d
///          db   "|  |-- OS --|  |",$d
///          db   "|  |--0.01--|  |",$d
///          db   "|  ;--------;  |",$d
///    