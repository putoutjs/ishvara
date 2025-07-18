'use 16';

function getStringLength(str) {
    const usi = str;
    const ucx = 0;
    const al = 1;
    
    __ishvara_while_8: {
        test(al, al);
        jz(__ishvara_while_end_8);
        lodsb();
        ++ucx;
        jmp(__ishvara_while_8);
    }
    __ishvara_while_end_8: return ucx;
}
