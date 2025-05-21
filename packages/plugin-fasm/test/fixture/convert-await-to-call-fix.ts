__ishvara_write: {
    push(es);
    push(ax);
    push(di);
    mov(cl, 0x1);
    mov(ch, 0x2);
    call(__ishvara_clear);
    pop(di);
    pop(ax);
    pop(es);
    ret();
}
__ishvara_clear: {
    push(es);
    push(ax);
    push(di);
    pop(di);
    pop(ax);
    pop(es);
    ret();
}
