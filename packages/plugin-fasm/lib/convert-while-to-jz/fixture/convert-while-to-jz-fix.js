'use 16';

function getStringLength(str) {
    const usi = str;
    const ucx = 0;
    const al = 1;
    
    __ishvara_while_8: {
        lodsb();
        ++ucx;
        test(al, al);
        jnz(__ishvara_while_8);
    }
    return ucx;
}
