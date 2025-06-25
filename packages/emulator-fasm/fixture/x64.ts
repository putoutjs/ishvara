'use 64';

import {getStringLength} from './x64/get-string-length.ts';

format.ELF64.executable = 3;
segment.readable.executable;
entry.$;

section: 'const';

let msg = ['Hello 64-bit world!', 0xA];
const msg_size = 20;

// sys_write
edx = msg_size;
rsi = msg;
edi = 1;
eax = 1;
syscall();

//sys_exit
edi = 0;
eax = 60;
syscall();

segment.readable.writeable;

section: 'code';
section: 'data';
