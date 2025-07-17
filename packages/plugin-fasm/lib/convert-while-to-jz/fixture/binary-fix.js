let esi = str;
let ecx = 0;

__ishvara_while_4: {
    ++ecx;
    {
        mov(al, [esi + ecx]);
        test(al, al);
    }
    jnz(__ishvara_while_4);
}
