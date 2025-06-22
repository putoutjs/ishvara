async function get() {
    push(bp);
    mov(bp, sp);
    mov([bp + 4], [bp + 2]);
    pop(bp);
    add(sp, 4);
}
