let line = 3;

export async function getLine(): i8 {
    return [line]
}

export async function incLine() {
    inc([line]);
}

export async function decLine() {
    dec([line]);
}

export async function setLine() {
    [line] = bh;
}
