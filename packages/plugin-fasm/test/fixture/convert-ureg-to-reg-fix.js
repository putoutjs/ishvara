function getStringLength(str) {
    mov(si, str);
    mov(cx, 0);
    mov(al, 1);
    
    __ishvara_do_while_8: lodsb();
    inc(cx);
    test(al, al);
    jnz(__ishvara_do_while_8);
    {
        mov(ax, cx);
        ret();
    }
}
