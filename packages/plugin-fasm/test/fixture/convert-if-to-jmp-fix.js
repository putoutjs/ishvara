__ishvara_compare: {
    {
        cmp(eax, ebx);
        jnz(__ishvara_fasm_if_end_1);
        {
            mov(ax, 5);
            ret();
        }
    }
    __ishvara_fasm_if_end_1: mov(ax, 3);
    ret();
    ret();
}
