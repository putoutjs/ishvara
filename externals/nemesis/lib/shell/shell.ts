import {
    org,
    use16,
    nemesis,
} from '@ishvara/operator-fasm';

org(0x500);
use16();

const _reboot = 0;
const _get_char = 1;
const _printf = 2;
const _find_file = 3;
const _exec = 4;
const _find_first = 5;
const _color = 6;
const _setcursor = 7;
const _gets = 8;
const _cls = 9;
const _getcursor = 0xa;
const _setminmaxcolline = 0xb;

const _cmd_size = 80;

let hi = [
    'Hi, I am Sh3ll. Type help for ',
    'more information',
    0xd,
];

let prompt = ']';

function start() {
    nemesis.printf(hi);
    nemesis.setScreenSize({
        columns: [1, 79],
        lines: [0, 24],
    });
    nemesis.printf(prompt);
    nemesis.gets({
        size: _cmd_size,
        buffer: _cmd_buff,
    });
    
    nemesis.printf(_cmd_buff);
    
    jmp($);
}

section: 'data';
let _cmd_buff: rb = _cmd_size + 1;
