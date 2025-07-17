__ishvara_while_1: {
    if (al === 0)
        (jmp(__ishvara_while_break_1));
    
    ++esi;
    ++ecx;
    {
        mov(al, [esi]);
        test(al, al);
    }
    jnz(__ishvara_while_1);
}
__ishvara_while_break_1: nop();
