import {
    org,
    use16,
    nemesis,
} from '@ishvara/operator-fasm';
import {clearBuffer} from './clear-buffer';
import {strcmp} from '../string/strcmp';

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

let cmd_help = 'help';

let cmd_list = [
    0xd,
    'Help? Why not o_O?',
    0xd,
    'help   - show this screen ;)',
    0xd,
    'dir    - show the files in dir where you now',
    0xd,
    'cls    - will clear the screen',
    0xd,
    'reboot - reboot the computer',
    0xd,
    'color  - change text and background color',
    0xd,
    0xd,
];

let prompt = ']';

async function start() {
    nemesis.printf(hi);
    nemesis.setScreenSize({
        columns: [1, 79],
        lines: [0, 24],
    });
    
    do {
        nemesis.printf(prompt);
        
        await clearBuffer(buffer);
        
        nemesis.gets({
            size: _cmd_size,
            buffer,
        });
        
        nemesis.printf(buffer);
        
        await strcmp(buffer, cmd_help);
        
        if (!al) {
            nemesis.printf(cmd_list);
            continue;
        }
        
        jmp($);
    } while (true);
}

section: 'code';
section: 'data';
let buffer: rb = _cmd_size + 1;
