export function getStringLength() {
    pop(ax);
    pop(si);
    push(ax);
    cx = -1;
    cld();
    
    do {
        lodsb();
        ++cx;
    } while (al);
    
    return cx;
}
