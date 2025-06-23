import {operator} from 'putout';

const {compare} = operator;
const RET = 'ret()';

export const report = () => `Avoid useless 'ret'`;

export const match = () => ({
    [RET]: (vars, path) => {
        const next = path.parentPath.getNextSibling();
        const prev = path.parentPath.getPrevSibling();
        
        if (compare(next, 'iret()'))
            return true;
        
        if (compare(next, 'ret(__a)'))
            return true;
        
        if (compare(prev, 'iret()'))
            return true;
        
        if (compare(prev, 'jmp(__a)'))
            return true;
        
        if (compare(prev, 'jmp.far(__a)'))
            return true;
        
        if (compare(prev, '__a: jmp(__b)'))
            return true;
        
        return compare(next, RET);
    },
});

export const replace = () => ({
    [RET]: '',
});
