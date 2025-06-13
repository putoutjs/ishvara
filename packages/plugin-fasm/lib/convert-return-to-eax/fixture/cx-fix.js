add: {
    const ax = 0x1;
    const bx = 0x2;
    
    {
        eax = ax + bx;
        ret();
    }
}
