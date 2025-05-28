function printf() {
    {
        cmp(eax, 0);
        jz(__ishvara_fasm_if_6);
        {
            ret;
        }
    }
    __ishvara_fasm_if_6: eax = 1;
}
