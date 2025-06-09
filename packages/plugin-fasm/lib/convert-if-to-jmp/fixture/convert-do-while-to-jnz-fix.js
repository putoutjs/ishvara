function x() {
    __ishvara_do_while_2: {
        cmp(cx, 0);
        jz(__ishvara_fasm_if_1);
        lodsb();
    }
    __ishvara_fasm_if_1: nop();
    test(cx, cx);
    jz(__ishvara_do_while_2);
}
