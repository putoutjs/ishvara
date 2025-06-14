__ishvara_setColumn: {
    {
        pop(bx);
        pop(ax);
        push(bx);
    }
    mov([col], al);
    ret();
}
__ishvara_setLine: {
    {
        pop(bx);
        pop(ax);
        push(bx);
    }
    mov([line], ax);
    ret();
}
