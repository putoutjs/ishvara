{
    cmp(al, FIRST);
    jle(__ishvara_fasm_if_end_1);
    cmp(al, LAST);
    jge(__ishvara_fasm_if_end_1);
    {
        ret();
    }
}
__ishvara_fasm_if_end_1: nop();
