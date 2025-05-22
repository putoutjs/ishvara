export const compare2 = (eax) => {
    {
        cmp(eax, 10);
        jnz(__ishvara_fasm_if_5);
        
        return 5;
    }
    __ishvara_fasm_if_5:     return 10;
};
