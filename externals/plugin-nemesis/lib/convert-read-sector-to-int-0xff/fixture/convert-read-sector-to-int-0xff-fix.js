import {nemesis} from '#operator-fasm';

{
    al = 12;
    int(0x0ff);
    jnc(__ishvara_read_sector_ok_3);
    al = 1;
    jmp(__ishvara_read_sector_end_3);
    __ishvara_read_sector_ok_3: ax = 0;
    __ishvara_read_sector_end_3: clc();
}
{
    {
        al = 12;
        int(0x0ff);
        jnc(__ishvara_read_sector_ok_5);
        al = 1;
        jmp(__ishvara_read_sector_end_5);
        __ishvara_read_sector_ok_5: ax = 0;
        __ishvara_read_sector_end_5: clc();
    }
    mov(bx, ax);
}
{
    ah = 1;
    bx = [kernel_begin];
    cl = 2;
    ch = 0;
    dl = 0;
    dh = 1;
    {
        al = 12;
        int(0x0ff);
        jnc(__ishvara_read_sector_ok_7);
        al = 1;
        jmp(__ishvara_read_sector_end_7);
        __ishvara_read_sector_ok_7: ax = 0;
        __ishvara_read_sector_end_7: clc();
    }
    mov(ax, ax);
}
