getStringLength: {
    push(bp);
    mov(bp, sp);
    si = [bp + 4];
    cx = -1;
    cld();
    
    do {
        lodsb();
        ++cx;
    } while (al)
    pop(bp);
    return cx;
    ret(2);
}
