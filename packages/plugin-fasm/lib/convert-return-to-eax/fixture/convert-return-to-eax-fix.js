add: {
    const eax = 0x1;
    const ebx = 0x2;
    
    {
        ax = eax + ebx;
        ret();
    }
}
