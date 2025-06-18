let col = 0;
let mincol = 0;

export async function getColumn(): i8 {
    return [col]
}

export async function incColumn() {
    inc([col]);
}

export async function decColumn() {
    dec([col]);
}

export async function setColumn() {
    [col] = bl;
}

export async function getMinColumn(): i8 {
    return [mincol]
}
