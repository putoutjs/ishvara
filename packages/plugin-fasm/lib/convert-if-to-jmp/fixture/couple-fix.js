{
    cmp(al, _enter);
    jnz(__ishvara_fasm_if_1);
    {
        inc([line]);
        [col] = 0;
        cmp([line], 25);
        jl(_nopoint2write);
        
        await scroll();
        
        dec([line]);
        jmp(_nopoint2write);
    }
}
__ishvara_fasm_if_1: {
    cmp(al, _backspace);
    jnz(__ishvara_fasm_if_2);
    {
        al = 0;
        ah = [mincol];
        
        if (ah === [col])
            jmp(_nopoint2write);
        
        dec([col]);
        dec([col]);
        di -= 2;
    }
}
__ishvara_fasm_if_2: nop();
