__ishvara_while_1: {
    {
        mov(al, [di]);
        test(al, al);
    }
    jz(__ishvara_while_end_1);
    stosb();
    jmp(__ishvara_while_1);
}
__ishvara_while_end_1: nop();
