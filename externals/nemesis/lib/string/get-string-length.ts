export async function getStringLength(str): ureg {
    let usi = str;
    let ucx = 0;
    
    cld();
    
    while (lodsb()) {
        ++ucx;
    }
    
    --ucx;
    
    return ucx;
}
