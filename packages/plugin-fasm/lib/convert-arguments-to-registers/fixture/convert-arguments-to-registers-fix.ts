async function setColumn() {
    push(bp);
    mov(bp, sp);
    {
        mov(ax, [bp + 2]);
        mov([col], ax);
    }
    pop(bp);
    add(sp, 2);
}

async function setLine() {
    push(bp);
    mov(bp, sp);
    {
        mov(ax, [bp + 2]);
        mov([line], ax);
    }
    pop(bp);
    add(sp, 4);
}

async function get() {
    return 5;
}
