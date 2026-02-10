__ishvara_fasm_if_5: __ishvara_fasm_if_4: if (al === _backspace) {
    ah = await getColumn();
    al = await getMinColumn();
    if (ah !== al) {
        await __ishvara_decColumn();
        await __ishvara_decColumn();
        di -= 2;
    }
}
