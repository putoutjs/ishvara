import {operator} from 'putout';

const {compare} = operator;
const isPrevXor = (vars, path) => {
    const prev = path.parentPath.getPrevSibling();
    return compare(prev, 'xor(__a, __a)');
};

export const report = (path) => `Avoid useless '${path.node.callee.name}'`;

export const match = () => ({
    'jz(__a)': isPrevXor,
    'jnz(__a)': isPrevXor,
});

export const replace = () => ({
    'jz(__a)': 'jmp(__a)',
    'jnz(__a)': '',
});
