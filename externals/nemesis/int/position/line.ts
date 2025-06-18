let line = 3;

export function getLine(): i8 {
    return [line];
}

export function incLine() {
    inc([line]);
}

export function decLine() {
    dec([line]);
}

export function setLine() {
    [line] = bh;
}
