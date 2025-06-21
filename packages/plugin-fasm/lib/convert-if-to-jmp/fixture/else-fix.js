export const compare2 = (eax) => {
    {
        cmp(eax, 10);
        jnz(__ishvara_fasm_if_end_1);
        
        return 5;
    }
    __ishvara_fasm_if_end_1: return 10;
};

{
    cmp(dx, 1);
    jnz(__ishvara_fasm_if_else_2);
    dh = 1;
    jmp(__ishvara_fasm_if_end_2);
    __ishvara_fasm_if_else_2: dh = 0;
}
__ishvara_fasm_if_end_2: {
    cmp([sec_number], 18);
    jle(__ishvara_fasm_if_else_3);
    {
        inc([track_number]);
        [sec_number] = 1;
    }
    jmp(__ishvara_fasm_if_end_3);
    __ishvara_fasm_if_else_3: {
        al = 0;
    }
}
__ishvara_fasm_if_end_3: nop();
