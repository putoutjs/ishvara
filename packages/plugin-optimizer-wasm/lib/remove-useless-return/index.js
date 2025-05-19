import {types} from 'putout';

const {isIfStatement} = types;
const {isFunction} = types;

export const report = () => `Avoid useless 'return'`;

export const match = () => ({
    'return __a': (vars, path) => {
        if (isFunction(path.parentPath.parentPath))
            return true;
        
        const {parentPath} = path;
        const next = parentPath.getNextSibling();
        
        if (isIfStatement(parentPath) && !next.node)
            return true;
        
        return false;
    },
});

export const replace = () => ({
    'return __a': '__a',
});
