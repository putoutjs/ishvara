setColumn: {
    push(bp);
    mov(bp, sp);
    [col] = bp + 2;
    pop(bp);
    add(sp, 2);
    ret();
}
