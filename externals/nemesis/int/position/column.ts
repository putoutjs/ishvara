let col = 0;
const minCol = 0;

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

export function getMinColumn(): i8 {
    return [minCol];
}
