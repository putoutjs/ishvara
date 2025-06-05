__ishvara_do_while_1: {
    push(cx);
    cx = 0x200;
    pop(cx);
    
    if (ax === 0)
        (jmp(ishvara_do_while_break_1));
    
    loop(__ishvara_do_while_1);
}
ishvara_do_while_break_1: nop();
