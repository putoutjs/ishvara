import {types} from 'putout';

const {isExportDeclaration} = types;

export const report = () => `Use 'mov' instead of 'const'`;

export const match = () => ({
    'const __a = __b': (vars, path) => !isExportDeclaration(path.parentPath),
});

export const replace = () => ({
    'const __a = __b': 'mov(__a, __b)',
});
