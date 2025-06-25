'use 16';

function getStringLength(str) {
    const usi = str;
    const ucx = 0;
    const al = 1;
    
    __ishvara_do_while_8: {
        lodsb();
        ++ucx;
        test(al, al);
        jz(__ishvara_do_while_8);
    }
    return ucx;
}
