export async function getStringLength(str): ureg {
    let usi = str;
    let ucx = 0;
    
    while ([usi]) {
        ++usi;
        ++ucx;
    }
    
    return ucx;
}
