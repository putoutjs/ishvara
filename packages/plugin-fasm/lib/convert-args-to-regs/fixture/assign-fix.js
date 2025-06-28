async function getStringLength() {
    push(bp);
    mov(bp, sp);
    mov(si, [bp + 4]);
    mov(cx, -1);
    
    cld();
    
    do {
        lodsb();
        ++cx;
    } while (al)
    pop(bp);
    ret(2);
}
