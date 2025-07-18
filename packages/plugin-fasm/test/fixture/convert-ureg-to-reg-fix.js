function getStringLength(str) {
    mov(si, str);
    mov(cx, 0);
    mov(al, 1);
    
    __ishvara_while_8: test(al, al);
    jz(__ishvara_while_end_8);
    lodsb();
    inc(cx);
    jmp(__ishvara_while_8);
    __ishvara_while_end_8: mov(ax, cx);
    ret();
}
