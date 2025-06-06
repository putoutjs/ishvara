export async function getStringLength() {
    pop(ax)
    pop(si);
    push(ax);
    cx = -1;

    do {
        lodsb();
        ++cx;
    } while (al)

    return cx;
}
