{
    cmp(al, FIRST);
    jg(__ishvara_fasm_if_or_1);
    cmp(al, LAST);
    jge(__ishvara_fasm_if_end_1);
    __ishvara_fasm_if_or_1: {
        ret();
    }
}
__ishvara_fasm_if_end_1: nop();
