import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    'xor(__a, __a)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        
        if (!next.node)
            return false;
        
        return compare(path, next);
    },
});

export const replace = () => ({
    'xor(__a, __a)': '',
});
