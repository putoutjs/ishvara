export async function setCursor<es, dx>(): iret {
// в bl;столбик
// в bh;рядок
// ;bx = offset
    ax = 0xb800
    es = ax;

    [col] = bl;
    [line] = bh;

    bx = 0;
    bl = [col];
    ax = 0;

    al = [line];
    dx = 80;
    // calculate y offset
    mul(dx);  
    bx += ax;

    // select to write low byte of index
    al = 0xf;
    dx = 0x03d4
    out(dx, al);

    // write it
    al = bl;
    dx = 0x03d5;
    out(dx, al);

    // select to write high byte of index
    al = 0xe;
    dx = 0x03d4;
    out(dx, al);

    // write it
    al = bh;
    dx = 0x03d5;
    out(dx, al);

    dx = 0;
    ax = 0;
    dl = [line];
    imul(dx, 80 * 2);
    di = dx;
    al = [col];
    imul(ax, 2);
    di += ax;
    
    return di;
}