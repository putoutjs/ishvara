{
    push(cx);
    nemesis.setColor({
        color: 4,
        background: 0,
    });
    nemesis.printf(hello);
    nemesis.setColor();
    push(pop);
}
debug('world');
