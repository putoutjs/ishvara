export const compare2 = (eax) => {
    {
        cmp(eax, 10);
        jnz(__ishvara_fasm_if_5);
        
        return 5;
    }
    __ishvara_fasm_if_5: return 10;
};

{
    cmp(dx, 1);
    jnz(__ishvara_fasm_if_8_not_ok);
    dh = 1;
    jmp(__ishvara_fasm_if_8);
    __ishvara_fasm_if_8_not_ok: dh = 0;
}
__ishvara_fasm_if_8: nop();
