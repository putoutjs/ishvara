function compare() {
    {
        cmp(eax, ebx);
        jnz(__ishvara_fasm_if_1);
        
        return 5;
    }
    __ishvara_fasm_if_1: return 3;
}
