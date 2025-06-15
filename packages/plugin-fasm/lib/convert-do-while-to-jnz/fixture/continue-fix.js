__ishvara_do_while_1: {
    (jmp(__ishvara_do_while_condition_1));
    __ishvara_do_while_condition_1: loop(__ishvara_do_while_1);
}
__ishvara_do_while_5: {
    (jmp(__ishvara_do_while_condition_5));
    __ishvara_do_while_condition_5: test(al, al);
    jnz(__ishvara_do_while_5);
}
__ishvara_do_while_9: {
    (jmp(__ishvara_do_while_condition_9));
    __ishvara_do_while_condition_9: test(al, al);
    jz(__ishvara_do_while_9);
}
