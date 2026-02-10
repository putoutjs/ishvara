{
    cmp(dx, 1);
    jnz(__ishvara_fasm_if_else_1);
    mov(dh, 1);
    jmp(__ishvara_fasm_if_end_1);
    __ishvara_fasm_if_else_1: mov(dh, 0);
}
__ishvara_fasm_if_end_1: nop();
