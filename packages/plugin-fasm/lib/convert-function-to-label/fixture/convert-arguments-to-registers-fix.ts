setColumn: {
    {
        pop(bx);
        pop(ax);
        push(bx);
    }
    [col] = al;
    ret();
}
