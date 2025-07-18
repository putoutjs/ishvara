export async function clearBuffer(buffer) {
    di = buffer;
    al = 0;
    
    while ([di])
        stosb();
}
