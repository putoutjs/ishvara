function printf() {
    {
        cmp(eax, 0);
        jz(__ishvara_fasm_if_end_1);
        {
            ret;
        }
    }
    __ishvara_fasm_if_end_1: eax = 1;
}
