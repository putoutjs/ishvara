export async function getStringLength(): i64 {
    pop(rax);
    pop(rsi);
    push(rax);
    rcx = -1;
    cld();

    do {
        lodsb();
        ++rcx;
    } while (al);

    return rcx;
}
