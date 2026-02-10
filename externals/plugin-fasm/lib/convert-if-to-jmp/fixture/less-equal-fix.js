{
    cmp(al, FIRST);
    jl(__ishvara_fasm_if_end_1);
    cmp(al, LAST);
    jg(__ishvara_fasm_if_end_1);
    {
        ret();
    }
}
__ishvara_fasm_if_end_1: nop();
