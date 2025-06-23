async function setColumn() {
    push(bp);
    mov(bp, sp);
    {
        mov(ax, [bp + 4]);
        mov([col], ax);
    }
    pop(bp);
}

async function setLine() {
    push(bp);
    mov(bp, sp);
    {
        mov(ax, [bp + 4]);
        mov([line], ax);
    }
    pop(bp);
}

async function get() {
    return 5;
}
