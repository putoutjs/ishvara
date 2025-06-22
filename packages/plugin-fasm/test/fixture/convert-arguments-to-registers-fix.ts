__ishvara_setColumn: {
    push(bp);
    mov(bp, sp);
    mov([col], bp + 2);
    pop(bp);
    add(sp, 2);
    ret();
}
__ishvara_setLine: {
    push(bp);
    mov(bp, sp);
    mov([line], bp + 2);
    pop(bp);
    add(sp, 2);
    ret();
}
