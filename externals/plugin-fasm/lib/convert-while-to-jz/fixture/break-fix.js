__ishvara_while_1: {
    {
        mov(al, [esi]);
        test(al, al);
    }
    jz(__ishvara_while_end_1);
    
    if (al === 0)
        (jmp(__ishvara_while_end_1));
    
    ++esi;
    ++ecx;
    jmp(__ishvara_while_1);
}
__ishvara_while_end_1: __ishvara_while_9: {
    {
        lodsb();
        test(al, al);
    }
    jz(__ishvara_while_end_9);
    
    if (al !== [udi])
        (jmp(__ishvara_while_end_9));
    
    ++udi;
    ++ucx;
    jmp(__ishvara_while_9);
}
__ishvara_while_end_9: nop();
