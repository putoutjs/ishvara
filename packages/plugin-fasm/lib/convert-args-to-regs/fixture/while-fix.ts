import {ureg} from '@ishvara/operator-fasm';

export async function strcmp() {
    push(bp);
    mov(bp, sp);
    mov(ax, 0);
    mov(si, [bp + 4]);
    mov(di, [bp + 6]);
    mov(cx, -1);
    
    cld();
    
    __ishvara_while_11: {
        {
            lodsb();
            test(al, al);
        }
        jz(__ishvara_while_end_11);
        
        if (al !== [di])
            (jmp(__ishvara_while_end_11));
        
        ++di;
        ++cx;
        jmp(__ishvara_while_11);
    }
    __ishvara_while_end_11: {
        pop(bp);
        ret(4);
    }
}
