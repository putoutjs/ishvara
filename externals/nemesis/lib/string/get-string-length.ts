import {ureg} from '@ishvara/operator-fasm';

export async function getStringLength(str): ureg {
    let usi = str;
    let ucx = 0;
    
    cld();
    
    while (lodsb()) {
        ++ucx;
    }
    
    return ucx;
}
