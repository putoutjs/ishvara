{
    cmp(al, 0);
    jz(__ishvara_fasm_if_end_1);
    ret();
}
__ishvara_fasm_if_end_1: __ishvara_do_while_4: {
    push(cx);
    loop(__ishvara_do_while_4);
}

