{
    mov(ah, 2);
    int(0x13);
    jnc(__ishvara_read_sector_ok_3);
    clc();
    mov(al, 1);
    __ishvara_read_sector_ok_3: mov(ax, 0);
}
