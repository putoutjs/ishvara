export const compare = (eax) => {
    {
        cmp(eax, 0x0);
        jnz(__ishvara_fasm_if_5);
        {
            mov(eax, 0x1);
            ret();
        }
    }
    __ishvara_fasm_if_5: mov(eax, 0x0);
    ret();
};

export const compare2 = (eax) => {
    {
        cmp(eax, 0x0);
        jz(__ishvara_fasm_if_12);
        {
            mov(eax, 0x1);
            ret();
        }
    }
    __ishvara_fasm_if_12: mov(eax, 0x0);
    ret();
};
