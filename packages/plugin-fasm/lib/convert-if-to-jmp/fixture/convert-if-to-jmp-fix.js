function compare() {
    {
        cmp(eax, ebx);
        jnz(__ishvara_fasm_if_5);
        
        return 5;
    }
    __ishvara_fasm_if_5: return 3;
}
