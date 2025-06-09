export const compare = (eax) => {
    {
        cmp(eax, 0);
        jnz(__ishvara_fasm_if_1);
        {
            mov(eax, 1);
            ret();
        }
    }
    __ishvara_fasm_if_1: mov(eax, 0);
    ret();
};

export const compare2 = (eax) => {
    {
        cmp(eax, 0);
        jz(__ishvara_fasm_if_2);
        {
            mov(eax, 1);
            ret();
        }
    }
    __ishvara_fasm_if_2: mov(eax, 0);
    ret();
};
