push(bx);
push(ax);
{
    cmp(al, 0);
    jz(__ishvara_fasm_if_end_1);
    {
        {
            cmp(al, _enter);
            jnz(__ishvara_fasm_if_end_2);
            {}
        }
        __ishvara_fasm_if_end_2: {
            cmp(al, _backspace);
            jnz(__ishvara_fasm_if_end_3);
            {}
        }
        __ishvara_fasm_if_end_3: nop();
    }
}
__ishvara_fasm_if_end_1: {
    pop(ax);
    pop(bx);
}
