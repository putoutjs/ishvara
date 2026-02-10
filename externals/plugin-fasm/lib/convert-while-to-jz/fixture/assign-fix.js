let esi = str;
let ecx = 0;

__ishvara_while_4: {
    {
        mov(al, [esi]);
        test(al, al);
    }
    jz(__ishvara_while_end_4);
    ++esi;
    ++ecx;
    jmp(__ishvara_while_4);
}
__ishvara_while_end_4: nop();
