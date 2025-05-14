import {types} from 'putout';

const {
    isFunction,
    isExportDeclaration,
} = types;

export const report = () => `Use 'local' instead of 'const'`;

export const match = () => ({
    'const __a = __b': (vars, path) => {
        if (isExportDeclaration(path.parentPath))
            return false;
        
        return isFunction(path.scope.block);
    },
});
export const replace = () => ({
    'const __a = __b': `{
        local(__a, i32)
        local.set(__a, i32.const(__b))
    }`,
});
