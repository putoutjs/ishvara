export const compare = (eax) => {
    {
        cmp(eax, 0);
        jnz(__ishvara_fasm_if_end_1);
        
        return 1;
    }
    __ishvara_fasm_if_end_1: return 0;
};

export const compare2 = (eax) => {
    {
        cmp(eax, 0);
        jz(__ishvara_fasm_if_end_2);
        
        return 1;
    }
    __ishvara_fasm_if_end_2: return 0;
};
