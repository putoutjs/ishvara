export const compare2 = (eax) => {
    {
        cmp(eax, 10);
        jnz(__ishvara_fasm_if_1);
        
        return 5;
    }
    __ishvara_fasm_if_1: return 10;
};

{
    cmp(dx, 1);
    jnz(__ishvara_fasm_if_2_not_ok);
    dh = 1;
    jmp(__ishvara_fasm_if_2);
    __ishvara_fasm_if_2_not_ok: dh = 0;
}
__ishvara_fasm_if_2: nop();
