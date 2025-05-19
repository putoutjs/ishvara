export function compare(a: i32): i32 {
    if (i32.eq(a, 10))
        return i32.const(1);
    
    return i32.const(0);
}
