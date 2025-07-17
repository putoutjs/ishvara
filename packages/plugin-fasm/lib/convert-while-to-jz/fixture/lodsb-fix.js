let esi = str;
let ecx = 0;

__ishvara_while_4: {
    ++ecx;
    {
        lodsb();
        test(al, al);
    }
    jnz(__ishvara_while_4);
}
