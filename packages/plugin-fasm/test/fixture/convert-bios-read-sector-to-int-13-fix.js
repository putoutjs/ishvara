{
    mov(ah, 2);
    int(0x13);
    jnc(__ishvara_read_sector_ok_3);
    mov(al, 1);
    jmp(__ishvara_read_sector_end_3);
    __ishvara_read_sector_ok_3: mov(ax, 0);
    __ishvara_read_sector_end_3: clc();
}
