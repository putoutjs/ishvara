import {bios} from '#operator-fasm';
import {printf} from './printf.js';

export async function reboot() {
    await printf(press_any_key);
    // ждем нажатия на клаву ;)
    bios.readChar();
    bios.reboot();
}
