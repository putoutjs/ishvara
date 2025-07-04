let esi = str;
let ecx = 0;

__ishvara_do_while_4: {
    ++esi;
    ++ecx;
    {
        al = [esi];
        test(al, al);
    }
    jnz(__ishvara_do_while_4);
}
