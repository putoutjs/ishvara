async function get() {
    push(ebp);
    mov(ebp, esp);
    mov(eax, [ebp + 8]);
    pop(bp);
    ret(4);
}
