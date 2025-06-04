{
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
