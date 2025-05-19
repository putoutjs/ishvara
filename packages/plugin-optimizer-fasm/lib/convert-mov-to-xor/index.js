import {operator} from 'putout';

const {compare} = operator;

const checkFirst = (name) => (path) => {
    const [first] = path.node.arguments;
    return first.name === name;
};

const isEdx = checkFirst('edx');
const isDx = checkFirst('dx');

const isPrev = (instr) => (path) => {
    const prev = path.parentPath.getPrevSibling();
    return compare(prev, instr);
};

const isPrevXorEax = isPrev('xor(eax, eax)');
const isPrevXorAx = isPrev('xor(ax, ax)');

export const report = (path) => {
    if (isEdx(path) && isPrevXorEax(path))
        return `Use 'cdq' instead of 'mov'`;
    
    if (isDx(path) && isPrevXorAx(path))
        return `Use 'cdq' instead of 'mov'`;
    
    return `Use 'xor' instead of 'mov'`;
};

export const exclude = () => [
    'mov(__array, __a)',
];

export const replace = () => ({
    'mov(__a, 0)': (vars, path) => {
        if (isEdx(path) && isPrevXorEax(path))
            return `cdq()`;
        
        if (isDx(path) && isPrevXorAx(path))
            return 'cwd()';
        
        return 'xor(__a, __a)';
    },
    'mov(__a, 1)': (vars, path) => {
        if (isEdx(path) && isPrevXorEax(path))
            return `{
                cdq();
                inc(edx);
            }`;
        
        if (isDx(path) && isPrevXorAx(path))
            return `{
                cwd();
                inc(dx);
            }`;
        
        return `{
            xor(__a, __a);
            inc(__a);
        }`;
    },
});
