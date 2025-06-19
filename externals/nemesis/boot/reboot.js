import {bios} from '#operator-fasm';
import {printf} from './printf.js';

const press_any_key = 'press any key';

export async function reboot() {
    await printf(press_any_key);
    // ждем нажатия на клаву ;)
    bios.readChar();
    bios.reboot();
}
