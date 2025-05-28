import {bios} from '#operator-fasm';

{
    ah = 2;
    int(0x13);
    jnc(__ishvara_read_sector_ok_3);
    al = 1;
    clc();
    __ishvara_read_sector_ok_3: ax = 0;
}
