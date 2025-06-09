__ishvara_compare: {
    {
        cmp(eax, ebx);
        jnz(__ishvara_fasm_if_1);
        {
            mov(eax, 5);
            ret();
        }
    }
    __ishvara_fasm_if_1: mov(eax, 3);
    ret();
    ret();
}
