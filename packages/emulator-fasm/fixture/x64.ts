'use 64';

import {getStringLength} from './string/get-string-length.ts';

format.ELF64.executable;
segment.readable.executable;
entry.$;

section: 'const';

let msg = ['Hello 64-bit world!', 0xA];

// sys_write
rdx = await getStringLength(msg);
rsi = msg;
rdi = 1;
rax = 1;
syscall();

//sys_exit
rdi = 0;
rax = 60;
syscall();

section: 'code';

segment.readable.writeable;
section: 'data';
