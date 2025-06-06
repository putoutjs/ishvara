{
    cmp(dx, 1);
    jnz(__ishvara_fasm_if_1_not_ok);
    mov(dh, 1);
    jmp(__ishvara_fasm_if_1);
    __ishvara_fasm_if_1_not_ok: mov(dh, 0);
}
__ishvara_fasm_if_1: nop();
