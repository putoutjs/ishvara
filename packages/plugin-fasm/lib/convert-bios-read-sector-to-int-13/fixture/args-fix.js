{
    al = 1;
    bx = kernel_begin;
    cl = 2;
    ch = 0;
    dl = 0;
    dh = 1;
    {
        ah = 2;
        int(0x13);
        jnc(__ishvara_read_sector_ok_1);
        al = 1;
        jmp(__ishvara_read_sector_end_1);
        __ishvara_read_sector_ok_1: ax = 0;
        __ishvara_read_sector_end_1: clc();
    }
    mov(ax, ax);
}
