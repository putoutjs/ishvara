let esi = str;
let ecx = 0;

__ishvara_while_4: {
    {
        mov(al, [esi + ecx]);
        test(al, al);
    }
    jz(__ishvara_while_end_4);
    ++ecx;
    jmp(__ishvara_while_4);
}
__ishvara_while_end_4: nop();
