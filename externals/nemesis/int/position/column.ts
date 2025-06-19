let col = 0;

export function getColumn(): i8 {
    return [col];
}

export function incColumn() {
    inc([col]);
}

export function decColumn() {
    dec([col]);
}

export function setColumn() {
    [col] = bl;
}
