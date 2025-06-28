__ishvara_setColumn: {
    push(bp);
    mov(bp, sp);
    mov(col, [bp + 4]);
    pop(bp);
    ret(2);
}
__ishvara_setLine: {
    push(bp);
    mov(bp, sp);
    mov(line, [bp + 4]);
    pop(bp);
    ret(2);
}
