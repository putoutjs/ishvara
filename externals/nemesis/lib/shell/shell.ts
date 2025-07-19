import {
    org,
    use16,
    bios,
    nemesis,
} from '@ishvara/operator-fasm';
import {notFound} from './commands/not-found.ts';
import {clearBuffer} from './clear-buffer';
import {strcmp} from '../string/strcmp';

org(0x500);
use16();

const cmdSize = 80;

let hi = [
    `Hi, I am Sh3ll. Type 'help' for `,
    'more information',
    0xd,
];

let HELP = 'help';
let REBOOT = 'reboot';
let COLOR = 'color';

let cmd_list = [
    'Nemesis HELP:',
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
];

let prompt = '] ';

async function start() {
    nemesis.printf(hi);
    nemesis.setScreenSize({
        columns: [2, 79],
        lines: [0, 24],
    });
    
    do {
        nemesis.printf(prompt);
        
        await clearBuffer(buffer);
        
        nemesis.gets({
            size: cmdSize,
            buffer,
        });
        
        await strcmp(buffer, HELP);
        
        if (!al) {
            nemesis.printf(cmd_list);
            continue;
        }
        
        await strcmp(buffer, REBOOT);
        
        if (!al) {
            bios.reboot();
            continue;
        }
        
        await notFound(buffer);
    } while (true);
}

section: 'code';
section: 'data';
let buffer: rb = cmdSize + 1;
