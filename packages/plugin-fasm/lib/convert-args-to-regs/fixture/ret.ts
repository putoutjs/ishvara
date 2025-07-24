async function getStringLength(str): i16 {
    mov(si, str);
    mov(cx, 0);
    cld();
    __ishvara_while_9: {
        lodsb();
        test(al, al);
        jz(__ishvara_while_end_9);
        inc(cx);
        jmp(__ishvara_while_9);
    }
    __ishvara_while_end_9: {
        mov(ax, cx);
        ret();
    }
}