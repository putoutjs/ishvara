import {operator} from 'putout';

const {compare} = operator;
const RET = 'ret()';

export const report = () => `Avoid useless 'ret'`;

export const match = () => ({
    [RET]: (vars, path) => {
        const next = path.parentPath.getNextSibling();
        
        return compare(next, RET);
    },
});

export const replace = () => ({
    [RET]: '',
});
