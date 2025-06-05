__ishvara_do_while_1: {
    push(cx);
    cx = 0x200;
    pop(cx);
    
    {
        cmp(ax, 0);
        jnz(__ishvara_fasm_if_6);
        (jmp(ishvara_do_while_break_1));
    }
    __ishvara_fasm_if_6: loop(__ishvara_do_while_1);
}
ishvara_do_while_break_1: nop();
