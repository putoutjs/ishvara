async function setColumn() {
    {
        pop(bx);
        pop(ax);
        push(bx);
    }
    [col] = al;
}

async function setLine() {
    {
        pop(bx);
        pop(ax);
        push(bx);
    }
    [line] = ax;
}
