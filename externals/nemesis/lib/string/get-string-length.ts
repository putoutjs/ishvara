export async function getStringLength(str): ureg {
    let usi = str;
    let ucx = -1;
    
    cld();
    
    do {
        al = [usi];
        ++usi;
        ++ucx;
    } while (al);
    
    return ucx;
}
