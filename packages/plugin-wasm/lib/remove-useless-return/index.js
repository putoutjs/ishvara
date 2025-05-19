import {types} from 'putout';

const {isIfStatement, isFunction} = types;

export const report = () => `Avoid useless 'return'`;

export const match = () => ({
    'return __a': (vars, path) => {
        if (isFunction(path.parentPath.parentPath))
            return true;
        
        const {parentPath} = path;
        const next = parentPath.getNextSibling();
        
        return isIfStatement(parentPath) && !next.node;
    },
});

export const replace = () => ({
    'return __a': '__a',
});

