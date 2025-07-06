export async function getStringLength(str): ureg {
    let usi = str;
    let ucx = -1;
    
    cld();
    
    while (lodsb()) {
        ++ucx;
    }
    
    return ucx;
}
