export const compare = (eax) => {
    {
        cmp(eax, 0);
        jnz(__ishvara_fasm_if_5);
        
        return 1;
    }
    __ishvara_fasm_if_5: return 0;
};

export const compare2 = (eax) => {
    {
        cmp(eax, 0);
        jz(__ishvara_fasm_if_12);
        
        return 1;
    }
    __ishvara_fasm_if_12: return 0;
};
