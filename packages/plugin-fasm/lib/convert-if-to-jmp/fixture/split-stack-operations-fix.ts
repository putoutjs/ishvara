push(bx);
push(ax);
{
    cmp(al, 0);
    jz(__ishvara_fasm_if_1);
    {
        {
            cmp(al, _enter);
            jnz(__ishvara_fasm_if_2);
            {}
        }
        __ishvara_fasm_if_2: {
            cmp(al, _backspace);
            jnz(__ishvara_fasm_if_3);
            {}
        }
        __ishvara_fasm_if_3: nop();
    }
}
__ishvara_fasm_if_1: {
    pop(ax);
    pop(bx);
}
