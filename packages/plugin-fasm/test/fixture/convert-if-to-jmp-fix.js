__ishvara_compare: {
    {
        cmp(eax, ebx);
        jnz(__ishvara_fasm_if_5);
        {
            mov(eax, 0x5);
            ret();
        }
    }
    __ishvara_fasm_if_5: mov(eax, 0x3);
    ret();
    ret();
}
