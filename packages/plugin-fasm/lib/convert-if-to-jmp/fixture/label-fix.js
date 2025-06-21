__ishvara_fasm_if_5: __ishvara_fasm_if_4: {
    cmp(al, _backspace);
    jnz(__ishvara_fasm_if_end_1);
    {
        ah = await getColumn();
        al = await getMinColumn();
        
        if (ah !== al) {
            await __ishvara_decColumn();
            await __ishvara_decColumn();
            di -= 2;
        }
    }
}
__ishvara_fasm_if_end_1: nop();
